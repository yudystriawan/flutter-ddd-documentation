# Flavor

Pada arsitektur ini menggunakan 3 flavor

1. dev
2. stage
3. prod


## Source Code

class `FlavorConfig` dapat ditemukan di `root_folder/core/lib/flavor/flavor_config.dart`.

```
enum Flavor { dev, stage, prod }

class FlavorConfig {
  final String appTitle;
  final String baseUrl;
  final Flavor flavor;

  static FlavorConfig? _instance;

  factory FlavorConfig({
    required String appTitle,
    required String baseUrl,
    required Flavor flavor,
  }) {
    return _instance ??= FlavorConfig._internal(appTitle, baseUrl, flavor);
  }

  FlavorConfig._internal(
    this.appTitle,
    this.baseUrl,
    this.flavor,
  );

  static FlavorConfig get instance => _instance!;
  static bool get isDevelopment => _instance?.flavor == Flavor.dev;
  static bool get isStaging => _instance?.flavor == Flavor.stage;
  static bool get isProduction => _instance?.flavor == Flavor.prod;
}
```

::: tip
Kalian dapat menambahkan atribut yang sesuai dengan kebutuhan kalian
:::

## Firebase Config

Jika ingin menambahkan pengaturan untuk Firebase, tentunya kita harus menambahkan file `google-services.json` (Android) dan `GoogleService-Info.plist `(iOS).

Untuk pemasangan file tersebut, bisa dilihat pada [Referensi](./#reference)

## Build or Run

Untuk menjalankan atau build aplikasi. data menambahakan argument berikut

::: details Build (Android)
- `flutter build apk -t lib/main_dev.dart --flavor dev`
- `flutter build apk -t lib/main_stage.dart --flavor dev`
- `flutter build apk -t lib/main_prod.dart --flavor prod`
:::

::: details Run
- `flutter run -t lib/main_dev.dart --flavor dev`
- `flutter run -t lib/main_stage.dart --flavor dev`
- `flutter run -t lib/main_prod.dart --flavor prod`
:::

## Reference
- [youtube](https://www.youtube.com/watch?v=4Y7WaeU3P60)
- [medium](https://medium.com/@animeshjain/build-flavors-in-flutter-android-and-ios-with-different-firebase-projects-per-flavor-27c5c5dac10b)
