# Infrastructure

## Directory Structure
Contoh struktur folder
```
├── infrasctructure
│   ├── product
│   │   ├── data_sources
│   │   │   ├── product_local_data_provider.dart (jika data dari local)
│   │   │   └── product_remote_data_provider.dart (jika data dari server)
│   │   ├── product_dtos.dart
│   │   ├── product_dtos.freezed.dart (generated file)
│   │   ├── product_dtos.g.dart (generated file)
│   │   └── product_repository.dart
```

- `product/data_sources/product_local_data_provider.dart`: file yang mengatur proses pengambilan atau perubahan data yang terjadi secara lokal.
- `product/data_sources/product_remote_data_provider.dart`: file yang mengatur proses pengambilan atau perubahan data yang terjadi di server.
- `product/product_dtos.dart`: merupakan file yang menampung objek data product.
- `product/product_repository`: merupakan file yang berisi class implementasi dari `interface repository`.

## DTO (Data Transfer Object)
Merupakan class model yang menampung data untuk/dari extenal layer (local or remote data provider).

### Source Code
Pada pembuata DTO, kami menggunakan bantuan dari [Freezed](https://link), [JsonAnnotation](https://link). Contoh dari penerapan DTO:

```
part 'product_dtos.freezed.dart';
part 'product_dtos.g.dart';

@freezed
class ProductDto with _$ProductDto {
  const ProductDto._();
  const factory ProductDto({
    @JsonKey(name: 'id') required String id,
    @JsonKey(name: 'product_name') required String name,
    @JsonKey(name: 'product_description') required String description,
    @JsonKey(name: 'product_price') required double price,
  }) = _ProductDto;

  // WAJIB, untuk generate model ProductDto yang nantinya digunakan untuk parsing ke/dari JSON
  factory ProductDto.fromJson(Map<String, dynamic> json) =>
      _$ProductDtoFromJson(json);

  // untuk generate model ProductDto dari domain Product.
  factory ProductDto.fromDomain(Product product) => ProductDto(
        id: product.id.getOrCrash(),
        name: product.name.getOrCrash(),
        description: product.description.getOrCrash(),
        price: product.price.getOrCrash().toDouble(),
      );

  // untuk generate domain Product dari model ProductDto
  Product toDomain() => Product(
        id: UniqueId.fromUniqueString(id),
        name: ProductName(name),
        description: ProductDescription(description),
        price: ProductPrice(price),
      );
}
```

### Rule

- Penamaan file dalam bentuk ditambahkan `_dtos.dart`
- Penamaan class atau file dalam bahasa inggris.

## Local or Remote Data Provider

merupakan class yang hanya mengatur proses pengambilan, pengiriman dan perubahan data. Dapat dilakukan oleh lokal (Database local) atau pada remote (Server melalui API). Pada file ini proses **HANYA** terbatas untuk proses tersebut.

### Source Code
Ini merupakan contoh dari penerapan `RemoteDataProvider`.
```
@injectable
class ProductRemoteDataProvider {
    final ApiClient _apiClient;

    ProductRemoteDataProvider(this._apiClient);

    Future<DC<ApiFailure, List<ProductDto>>> fetchProducts() async {
        try {
        final response = await _apiClient.get(ApiPath.getProducts);

        // return when success
        if (response.statusCode == 200) {
            final items = response.data['items'] as List;
            final dtos = items
                .map((e) => ProductDto.fromJson(e as Map<String, dynamic>))
                .toList();
            return DC.data(dtos);
        }

        // return when failure
        return DC.error(
          ApiFailure.serverFailure(code: response.statusCode, errMessage: response.statusMessage,));
        } on ApiFailure catch (e) {
            return DC.error(e);
        } catch (e) {
            // return when unexpected error happens.
            return DC.error(const ApiFailure.unexpectedFailure());
        }
  }
}
```

### Rule

- Penamaan file dan class ditulis dalam bahasa inggris
- `return` value dari setiap method/fungsinya menggunakan bantuan dari [DataChannel](https://pub.dev/packages/data_channel) `Future<DC<ApiFailure, DataTypeWhenSuccess>>`
- **WAJIB** menggunakan `try-catch`.
- Pada `remoteDataProvider` Terdapat `catch` untuk `ApiFailure` untuk meng-handle error yang disebabkan oleh response API.

::: tip
Untuk memudahkan programmer dalam men-trace error, dapat menggunakan bantuan `debutPrint()` atau `log()`
:::

## Repository

Class ini merupakan class yang menerapkan [Interface Repository](https://link).

### SourceCode

Contoh dari `repository`:

```
@Injectable(as: IProductRepository)
class ProductRepository implements IProductRepository {
  final ProductRemoteDataProvider _remoteDataProvider;

  ProductRepository(this._remoteDataProvider);

  @override
  Future<Either<AppException, KtList<Product>>> loadProducts() async {
    try {
      final response = await _remoteDataProvider.fetchProducts();
      if (response.hasError) {
        return left(response.error!);
      }

      final products =
          response.data!.map((e) => e.toDomain()).toImmutableList();

      return right(products);
    } catch (e, s) {
      log('loadProducts', name: 'ProductRepository', error: e, stackTrace: s);
      return left(const AppException.unexpectedException());
    }
  }

  ...
}
```

### Rule

- Nama class harus sama dengan nama Interfacenya (dihilangkan huruf I)
- Terdapat `try-catch`
- Terdapat pengecekan `response.hasError`
- Untuk mempermudah programmer dalam trace error, dapat menggunakan bantuakn `log()`.
