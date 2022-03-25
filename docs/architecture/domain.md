# Domain


## Directory Structure
```
├── core
│   ├── errors.dart
│   ├── failures.dart
│   ├── failures_freezed.dart (generated)
│   ├── value_objects.dart
│   └── value_validators.dart
├── domain_name
│   ├── i_domain_name_repository.dart
│   ├── domain_name.dart
│   ├── domain_name_freezed.dart (generated)
│   ├── domain_name_failure.dart
│   ├── domain_name_failure_freezed.dart (generated)
│   └── value_objects.dart
```

- `core/errors.dart`: merupakan class error yang mengatur jika domain *invalid*.  
- `core/failures.dart`: merupakan kumpulan *possible failure* untuk inti dari domain.  
- `core/value_objects.dart`: merupakan class yang merepresentasikan inti dari sebuah domain.  
- `core/value_validators.dart`: merupakan class yang merumuskan logika atau aturan yang akan dipakai oleh `value_object`.  
- `domain_name/i_domain_name_repository.dart`: merupakan ***interface*** yang dibuat untuk mengatur object domain.  
- `domain_name/domain_name.dart`: merupakan object domain itu sendiri. Class ini yang nantinya digunakan pada [Presentation layer](../architecture/presentation.md)
- `domain_name/domain_name_failure.dart`: merupakan kumpulan *possible failure* yang terjadi pada domain ini.
- `domain_name/value_objects.dart`: merupakan *property* atau *atribut* dari domain.

::: warning
Class `ValueObject<T>` yang berada dalam `core/value_objects.dart` tidak boleh diubah
:::

## Value Objects

Pada file ini kita mewajibkan untuk mendefinisikan ***atribut*** atau ***property*** dari Domain. Dengan mendefinisikan suatu object kita dapat menentukan **boundaries** dari sebuah Domain.

### Source Code

Untuk pembuatan `value_object` menggukanan code seperti ini

```
class ClassName extends ValueObject<DataType> {
  @override
  final Either<ValueFailure<DataType>, DataType> value;

  factory ClassName (DataType input) {
    // aturan atau boundaries dari object
   return ProductName._(validateStringNotEmpty(input));
  }

  const ClassName ._(this.value);
}

```

jika ingin membuat aturan lebih dari satu untuk sebuah objek bisa seperti ini

```
...
factory ClassName (DataType input) {
    // aturan atau boundaries dari object
   return ClassName._(validateStringNotEmpty(input).flatMap(validateStringNotEmpty));
}
...

```
Selain itu, tidak menutup kemungkinan membuat aturan lebih dinamis dengan membuat variable/parameter/argument.

```
class ClassName extends ValueObject<String> {
  @override
  final Either<ValueFailure<String>, String> value;

  static const maxStringLength = 1000;

  factory ClassName(String input) {
    return ClassName._(validateMaxStringLength(input, maxStringLength).flatMap(validateStringNotEmpty));
  }

  const ClassName._(this.value);
}
```

### Rule

- Penamaan Class Value Object harus memiliki kata domain-nya, misal: `ProductName, ProductDescription, ProductPrice`
- Nama harus dalam **Bahasa Inggris**
- Penamaan menggunakan `camelCase` dengan huruf kapital di awal karakter.


## Domain

Mungkin lebih umum dapat dibilang seperti model. Merupakan class yang menampung data object.

### Source Code

Pembuatan Domain sama seperti pembuatan Object Class pada umumnya, tetapi pada arsitektur ini kami menggunakan [Freezed](https://pub.dev/packages/freezed) untuk membantu dalam pembuatan **immutable class**.

```
@freezed
class Product with _$Product {
  const Product._();
  const factory Product({
    required UniqueId id,
    required ProductName name,
    required ProductDescription description,
    required ProductPrice price,
  }) = _Product;

  // default domain
  // dengan menggunakan factory pattern kita bisa mendefinisikan nilai default hanya dengan memanggil fungsi class factory.
  factory Product.empty() => Product(
        id: UniqueId(),
        name: ProductName(''),
        description: ProductDescription(''),
        price: ProductPrice(0),
      );

  // menerima data domain valid (none) atau tidak (some)
  // merupakan fungsi yang mengatur apakah atribut domain yang diinginkan valid (sesuai dengan aturan yang digunakan) atau tidak
  // akan return data dari some(f) jika salah satu atribut tidak sesuai dengan aturan yang digunakan
  // akan return none() jika SELURUH atribut domain yang ada di fungsi ini sesuai dengan aturan yang digunakan.
  Option<ValueFailure<dynamic>> get failureOption {
    return name.failureOrUnit
        .andThen(description.failureOrUnit)
        .andThen(price.failureOrUnit)
        .fold(
          (f) => some(f),
          (_) => none(),
        );
  }
}
```

### Rule

- Penamaan Class Domain harus jelas, misal `Product, Transaction, User`
- Nama harus dalam **Bahasa Inggris**
- Terdapat factory method `empty()` pada setiap domain.
- Jika ingin mengirim perubahan data Domain seperti fungsi `Create` atau `Update` ke remote atau local. Pada Domain **WAJIB** membuat fungsi `failureOption`

### Value

Untuk mendapatkan nilai dari atributnya ada beberapa cara.

- Menggunakan `getOrCrash()`. Fungsi ini menampilkan nilai dari atribut jika atribut tersebut **sesuai** dengan aturan atau bondary yang ditetapkan dan akan membuat aplikasi **crash** apabila aturan tersebut tidak valid.
- Menggunakan `getOrElse(defaultValue)`. Fungsi ini mirip dengan `getOrCrash()` hanya saja kita **WAJIB** memberikan "nilai pengganti" jika atribut mempunyai aturan yang invalid. Tipe data `defaultValue` harus sama dengan value dari atributnya. Contoh: `productName.getOrElse('-'); productPrice.getOrElse(0)`. 

Selain itu dengan menggunakan atribut domain. Kita juga dapat mengecek salah satu atributnya apakah valid (sesuai dengan aturannya) atau tidak dengan menggunakan `isValid()`. Fungsi ini akan return `true` atau `false`.



## Domain Failure

Pada saat ingin melakukan perubahan CRUD baik melalui remote (server) atau local terdapat kemungkinan terjadinya error yang mungkin terjadi berhubungan dengan Domain tersebut. Dengan memetakan kemungkinan failure yang akan terjadi dari segi developer akan lebih mudah untuk debug fungsi dan dari segi UI dapat dengan mudah menampilkan response error yang sesuai.

### Source Code

Contoh failure yang wajib ada di setiap Domain

```
@freezed
abstract class DomainNameFailure with _$DomainNameFailure {
  // failure yang tidak dapat kita duga, atau bisa digunakan sebagai default failure dari domain Product
  const factory DomainNameFailure.unexpected() = _Unexpected;
  
  // merupakan default error jika terdapat fungsi yang berhubungan dengan remote data.
  const factory DomainNameFailure.serverError(ApiFailure f) = _ServerError;
}
```

Kita bisa menambahkan failure lainnya yang berhubungan dengan Domain tersebut juga. Seperti contoh pada class `ProductFailure` dibawah

```
@freezed
abstract class ProductFailure with _$ProductFailure {
    ...
    const factory ProductFailure.unableToUpdate() = _UnableToUpdate;
    const factory ProductFailure.unableToInsert() = _UnableToInsert;
    const factory ProductFailure.unableToDelete() = _UnableToDelete;
    const factory ProductFailure.notFound() = _NotFound;
}

```
::: tip
Penggunaan domain failure tidak terpaku pada contoh diatas, domain failure dapat ditambahakan atau dikurangi sesuai dengan kebutuhan domain itu sendiri
:::

### Rule

- Penamaan Class Domain Failure memiliki kata pertama domain-nya. Contoh: `ProductFailure, TransactionFailure, PaymentFalure`. 
- Nama harus dalam **Bahasa Inggris**
- Penamaan method factory harus memiliki makna yang jelas (tidak ambigu).


## Interface Repository

Pada contoh ini kami menggunakan `i_product_repository.dart`. Pada **dart** tidak ada interface, tetapi kita bisa mengakalinya dengan menggunakan fungsi `abstract class`. Class ini bertujuan untuk mengumpukan data yang berhubungan dengan **domain**nya. Biasanya tempat untuk melakukan fungsi CRUD.

### Source Code

```
abstract class IProductRepository {
  Future<Either<ProductFailure, KtList<Product>>> loadProducts();
  Future<Either<ProductFailure, Product>> loadProduct(UniqueId id);
  Future<Either<ProductFailure, Unit>> addProduct(Product product);
  Future<Either<ProductFailure, Unit>> editProduct(Product product);
  Future<Either<ProductFailure, Unit>> removeProduct(UniqueId id);
}
```

### Rule

- Penamaan Class harus sesuai format `IDomainNameRepository` ganti `DomainName` sesuai dengan nama domain. Contoh: `IProductRepository, ITransactionRepository, IPaymentRepository`.
- Penamaan ditulis dalam **Bahasa Inggris**.
- Menggunakan format `<Either<DataLeft, DataRight>>`, dimana `DataLeft` merupakan respon jika pada fungsi ini terpadat error, dan `DataRight` merupakan respon jika fungsi ini berhasil dijalankan.




