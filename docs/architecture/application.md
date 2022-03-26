# Application

Tempat dimana logika dari sebuah aplikasi berada. Pada arsitektur ini kami menggunakan [flutter_bloc](https://pub.dev/packages/flutter_bloc).

::: tip
Pada penerapannya kalian bebas meggunakan BLOC atau Cubit. Pada dasarnya kedua itu sama. Untuk mengetahui lebih lanjut, bisa kunjungi [link berikut.](https://bloclibrary.dev/#/gettingstarted)
:::


## Directory Structure

Pada arsitektur ini terdapat penerapan bloc yang umum digunakan. Pada dasarnya kita bisa membuat sesuai dengan keiinginan kita, tetapi untuk beseragaman pada penerapan bloc terdapata 3 **Penerapanan umum**. Yaitu, `loader, form,` dan `actor`. Contoh struktur folder bisa dilihat dibawah ini.

```
├── application
│   └── product 
│   │   ├── loader
│   │   │   ├── product_loader_bloc.dart
│   │   │   ├── product_loader_bloc.freezed.dart (generated file)
│   │   │   ├── product_loader_event.dart
│   │   │   └── product_loader_state.dart 
│   │   ├── form
│   │   │   ├── product_form_bloc.dart
│   │   │   ├── product_form_bloc.freezed.dart (generated file)
│   │   │   ├── product_form_event.dart
│   │   │   └── product_form_state.dart
│   │   ├── actor
│   │   │   ├── product_actor_bloc.dart
│   │   │   ├── product_actor_bloc.freezed.dart (generated file)
│   │   │   ├── product_actor_event.dart
│   │   │   └── product_actor_state.dart
```

Pembeda dari ketiga penerapan diatas selain namanya adalah fungsinya.
- `loader`: berfungsi khusus untuk `fetch` data dari local atau remote.
- `form`: berfungsi khusus untuk membuat penampungan data sementara. Biasanya digunakan untuk `form-field` pada saat `update` atau `insert` data ke local atau remote.
- `actor`: berfunsi khusus untuk menerima inputan sederhana atau yang menggunakan logika tidak terlalu kompleks dari **Pengguna**. Biasanya digunakan untuk menerapkan fungsi `delete`.

::: tip
Dilihat dari ketiga penamaan diatas. Penerapan CRUD-pun diterapkan dengan menggunakan bloc yang terpisah satu dengan lain. Sehingga kita sebagai developer dapat lebih **terfokus** dalam proses maintenance code.
:::

::: warning
Penamaan tidak harus terpaku dengan apa yang ada diatas. Kalian bisa dengan bebas menamai bloc sesuai dengan kebutuhan. Yang ditekankan disini adalah setiap data yang ingin kita tampilkan/ubah/tambah/hapus **WAJIB** memisahkannya.
:::

### Rule

- Penamaan ditulis dalam bahasa inggris.
- Penamaan file dart ditulis dengan format `lowercase` dengan pemisah `_` disetiap katanya.

## State

Dengan menggunakan bantuan [freezed](https://link) terdapat 2 jenis penerapan yang dapat kita gunakan.
1. State yang menggunakan `factory-pattern` class.
2. State yang mempunyai `atribut/property`.

Untuk State yang pertama dapat diibaratkan kita **hanya** ingin GET data itu saja, tidak ada data lain yang kita perlukan untuk mengambil data tersebut. Contoh: `getDetailProduct, getDetailTransaction`. Sedangkan State yang kedua kita GET data tetapi kita diharuskan untuk **menggunakan data lain** sebagai referensi/parameter/arguments seperti sebagai ilustrasi, jika ingin mengambil data yang banyak biasanya akan dihadapkan dengan `pagination` sehingga kita diwajibkan untuk menyimpan referensi `indexPage` atau `keyword`. Contoh: `getProducts, getTransactions`.


### Source Code

::: details Jenis Pertama
`loader`
``` 
@freezed
class ProductDetailLoaderState with _$ProductDetailLoaderState {
  const factory ProductDetailLoaderState.initial() = _Initial;
  const factory ProductDetailLoaderState.loadInProgress() = _LoadInProgess;
  const factory ProductDetailLoaderState.loadFailure(ProductFailure failure) =
      _LoadFailure;
  const factory ProductDetailLoaderState.loadSuccess(Product product) =
      _LoadSuccess;
}
```
`actor`
```
@freezed
class ProductActorState with _$ProductActorState {
  const factory ProductActorState.initial() = _Initial;
  const factory ProductActorState.actionInProgress() = _LoadInProgess;
  const factory ProductActorState.deleteFailure(ProductFailure failure) =
      _LoadFailure;
  const factory ProductActorState.deleteSuccess() =
      _LoadSuccess;
}
```
:::

::: details Jenis kedua.
`loader`
```
@freezed
abstract class ProductLoaderState with _$ProductLoaderState {
  const factory ProductLoaderState({
    @Default(false) bool isLoading, // data yang menampung jika proses load sedang berjalan.
    @Default(false) bool hasReachedMax,
    @Default(1) int page,
    required StringSingleLine queryName,
    required KtList<Product> products,  // merepresentasikan data succes
    required Option<ProductFailure> failureOption, // merepresentasikan data succes
  }) = _ProductLoaderState;

  // factory untuk menginisiali state pada saat constructor method dipanggil
  factory ProductLoaderState.initial() => ProductLoaderState(
        queryName: StringSingleLine(''),
        products: const KtList.empty(),
        failureOption: none(),
      );
}
```
`form`
```
@freezed
class ProductFormState with _$ProductFormState {
  const factory ProductFormState({
    required Product product,
    required Option<Either<ProductFailure, Unit>> failureOrSuccessOption, // data yang merepresentasikan failure atau success.
    @Default(false) bool isSubmitting,
    @Default(false) bool isEditing,
    @Default(false) bool showErrorMessages,
  }) = _ProductFormState;

  factory ProductFormState.initial() => ProductFormState(
        product: Product.empty(),
        failureOrSuccessOption: none(),
      );
}
```
:::

### Rule

- Terdapat atribut atau factory untuk menampung perubahan data loading. Contoh: `loadInProgress()` atau `actionInProgress()` pada jenis pertama dan `bool isLoading` atau `bool isSubmitting` pada jenis kedua.
- Terpata atribut atau class yang merepresentasikan data jika proses sukses dan gagal.
- Penamaan atribut atau factory-pattern ditulis dalam bahasa inggris.
- Terdapat initial class.

## Event

Merupakan fungsi-fungsi yang dapat kita **trigger** untuk menjalankan fungsi bloc.

### Source Code

```
@freezed
class ProductFormEvent with _$ProductFormEvent {
  const factory ProductFormEvent.initialized(Option<Product> initialData) =
      _Initialized;
  const factory ProductFormEvent.nameChanged(String name) = _NameChanged;
  const factory ProductFormEvent.descriptionChanged(String description) =
      _DescriptionChanged;
  const factory ProductFormEvent.priceChanged(num price) = _PriceChanged;
  const factory ProductFormEvent.submitted() = _Submitted;
}
```

### Rule

- Penamaan fungsi ditulis dalam bahasa inggris past-tense.
- Penamaan harus jelas dan tidak ambigu.

## Bloc

Merupakan tempat yang mengatur logika dari event yang kita buat sebelumnya.

### Source Code

Terdapat beberapa perbedaan jika menggunak bloc dengan freezed. Berikut adalah contoh dari file `bloc.dart`.

```
@injectable
class ProductLoaderBloc extends Bloc<ProductLoaderEvent, ProductLoaderState> {
  final IProductRepository _productRepository;
  ProductLoaderBloc(this._productRepository)
      : super(const ProductLoaderState.initial()) {
    on<ProductLoaderEvent>(_onProductLoaderEvent);
  }

  Future<void> _onProductLoaderEvent(
    ProductLoaderEvent event,
    Emitter<ProductLoaderState> emit,
  ) {
    return event.map(
      fetched: (e) async {
        emit(const ProductLoaderState.loadInProgress());

        final failureOrSuccess = await _productRepository.loadProducts();

        emit(failureOrSuccess.fold(
          (f) => ProductLoaderState.loadFailure(f),
          (items) => ProductLoaderState.loadSuccess(items),
        ));
      },
    );
  }
}
```

### Rule

- Terdapat private method untuk mengkonversi event bloc `_onProductLoaderEvent` dengan tipe data `Future<void>` dan membawa parameter `Event bloc dan Emitter<State>`.
- Jika terdapat parameter `interface repository` atau module dari `dependency injection` tambahkan anotasi `@injectable`.

