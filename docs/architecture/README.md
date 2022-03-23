# Architecture

Dokumentasi ini dirancang sebagai panduan pembuatan aplikasi Flutter dengan tujuan untuk menjaga konsistensi, memudahkan, mempercepat dan mengoptimalisasi pembuatan aplikasi oleh tim.

## Domain Driven Design

Domain Driven Design atau yang disingkat DDD merupakan salah satu arsitektur yang digunakan untuk mecapai **Clean Architecture**. Arsitektur ini memecah kode menjadi bentuk **modular**. Selain itu, kelebihan dari arsitektur ini membuat `class model` atau Class yang digunakan untuk merepresentasikan data jadi memiliki aturan atau **boundary**-nya sendiri. Sehingga setiap `class model` atau dalam arsitektur ini disebut **DOMAIN** menjadi lebih independent.

::: tip
Untuk mempelajari lebih lanjut tentang DDD bisa lihat tutorial dari [Reso Coder](https://resocoder.com/2020/03/09/flutter-firebase-ddd-course-1-domain-driven-design-principles/) 