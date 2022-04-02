# Presentation

Layer khusus untuk yang terdapat berbagai macam komponen UI.

## Directory Structure

```
├── presentation
│   ├── components
│   │   └── gen
│   │       └── asset.gen.dart (generated)
│   ├── styles
│   │   ├── color.dart
│   │   └── typhography.dart
│   ├── pages
│   │   ├── page_name
│   │   │   ├── widgets
│   │   │   │   └── component_ui_page.dart
│   │   │   └── page_name_page.dart
│   │   ├── routes
│   │   │   ├── app_router.dart
│   │   │   └── app_router.gr.dart (generated)
```

- `components/get/assets.gen.dart`: merupakan generated file yang berisi kumpulan PATH asset.
- `styles/color.dart`: kumpulan color untuk aplikasi.
- `styles/typography.dart`: kumpulan setting font untuk aplikasi
- `pages/`: tempat untuk menaruh kumpulan `pages` pada aplikasi
- `pages/page_name/widgets/`: tempat untuk menaruh komponen-komponen yang ada pada page tesebut.
- `router/app_router.dart`: File yang menampung nama-nama page yang digunakan pada aplikasi.

## Rule

- Penamaan file `.dart` ditulis dalam bahasa inggris.
- Penamaan file untuk menampilkan screen pada aplikasi ditambah suffix `_page.dart`. Contoh, untuk screen `home` maka screen-nya memakai `home_page.dart`,
- **Dilarang keras** menggunakan `Widget` sebagai variabel ataupun fungsi. `Widget` **WAJIB** berupa class yang extend `StatelessWidget`atau `StatefulWidget` dan dibuatkan file-nya sendiri.
- Dalam pembuatan UI, setiap Ui yang ada dalam page **WAJIB** dipisah menjadi komponen-komponen kecil dan ditaruh didalam `page_name/widgets/` folder. Untuk memudahkan dalam pencarian code.
- Jika ingim membuat komponen `Widget` yang **dipakai secara global**. Taruh komponen tersebut didalam folder `lib/presentation/components/widgets/`.

## Route

Untuk membuat page route baru hal yang harus dilakukan adalah

1. Pada file `app_router.dart` tambahkan class yang akan menjadi `page`
2. Buka terminal, dan pastikan berada pada root directory. dan jalankan `flutter pub run build_runner build --delete-conflicting-outputs`.
3. selesai.

::: tip
Gunakan tututorial [ini]([https://link](https://resocoder.com/2021/09/16/flutter-bottom-navigation-with-nested-routing/)) untuk membuat bottom-nav-bar ataupun tabs
::: 

::: warning
Info lebih lanjut bisa di cek di [auto_router]([https://link](https://pub.dev/packages/auto_route)).
:::

## Assets

Asset untuk images berada dalam folder `assets/images/` dan untuk icon berada pada folde `assets/icons`.

::: warning
Pada images terdapat tambahan folder, yaitu `2.0x` dan `3.0x`. Penerapan tersebut terserah ingin kalian terapkan atau tidak. Jika ingin diterapkan silahkan merujuk ke petunjuk [init]([https://link](https://docs.flutter.dev/development/ui/assets-and-images)). Jika tidak silahkan **hapus** folder tersebut.
:::

### Generate assets

Untuk mempermuudah pemanggilan assets supaya kita tidak harus mengetik lokasi assets secara manual kami menggunakan bantuan [flutter_gen](https://pub.dev/packages/flutter_gen). Jalankan perintah ini pada folder_root terminal `flutter packages pub run build_runner build` untuk mengenerate class yang dapat dipanggil sesuai dengan nama asset dan lokasinya.

### Rule

- Penamaaan icon tambahkan prefix `ic_`.
- Penamaan images tambahkan prefix `img_`
- Nama file ditulis dalam bahasa inggris.
- Gunakan permisah `underscore (_)` antar kata. 

## Color

Penambahan color yang dibutuhkan app ditambahkan di file `lib/presentation/components/style/color.dart`;

## Typography

Penambahan pengaturan untuk `TextStyle` pada aplikasi ada pada `lib/presentation/components/style/typography.dart`.

::: tip
Flutter secara bebas dapat menggunakan font family apapun. Tetapi jika font family tersebut terdapat pada google font. Kita bisa pakai package [google_fonts](https://pub.dev/packages/google_fonts).
:::

## Bloc builder dan bloc listener

1. Gunakan argument `buildWhen` **Jika bisa** pada setiap pembuatan `BlocBuilder` supaya widget akan terupdate pada saat kondisi yang ditetapkan. 
2. Gunakan argument `listenWhen` **Jika bisa** pada setiap pembuatan `BlocLister`.

::: tip
Pembuatan form untuk edit dan add biasanya akan mempunyai field yang sama. Maka dari itu kita cukup membuat satu page saja untuk manempilkan kedua kondisi tersebut. Contoh dapat di temukan pada tutorial [ResoCoder](https://www.youtube.com/watch?v=QjPuAHttTIo&list=PLB6lc7nQ1n4iS5p-IezFFgqP6YvAJy84U&index=18)

