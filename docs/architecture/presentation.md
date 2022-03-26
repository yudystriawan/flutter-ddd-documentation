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
- Dalam pembuatan UI, setiap page **WAJIB** dipisah menjadi komponen-komponen kecil dan ditaruh didalam `page_name/widgets/` folder. Untuk memudahkan dalam pencarian code.
- Jika ingim membuat komponen `Widget` yang **dipakai secara global**. Taruh komponen tersebut didalam folder `components/`.
