<!-- Struktur proyek ini terdiri dari sebuah komponen utama ListTodo yang berfungsi sebagai layar utama aplikasi To-Do List. Komponen ini menggunakan berbagai fitur dari React Native, seperti useState, useEffect, useRef, useContext, dan createContext untuk manajemen state, efek samping, referensi, dan konteks. Selain itu, komponen ini juga menggunakan AsyncStorage dari @react-native-async-storage/async-storage untuk menyimpan data todos secara lokal di perangkat.

Komponen utama ListTodo menggunakan FlatList dari React Native untuk menampilkan daftar todos. Setiap item todo direpresentasikan oleh komponen TodoItem. FlatList membutuhkan data, renderItem, dan keyExtractor sebagai prop untuk menampilkan daftar data.

Pada bagian atas komponen utama, ada TodoContext yang dibuat menggunakan createContext. Ini digunakan untuk berbagi fungsi toggleTodo dan deleteTodo antara komponen ListTodo dan TodoItem.

Alasan pemilihan teknologi atau library:

React Native: Dipilih karena memungkinkan pengembangan aplikasi mobile lintas platform dengan menggunakan JavaScript.
AsyncStorage: Digunakan untuk menyimpan data todos secara lokal di perangkat, sehingga data tetap tersedia bahkan setelah aplikasi ditutup.
FlatList: Digunakan untuk menampilkan daftar todos dengan performa yang baik, terutama ketika jumlah datanya besar.
Context API: Digunakan untuk manajemen state global (todos) dan berbagi fungsi (toggleTodo dan deleteTodo) antara komponen tanpa harus melewati props secara berlebihan.





To-Do List App
Aplikasi To-Do List sederhana yang memungkinkan pengguna untuk membuat, menandai sebagai selesai, dan menghapus tugas-tugas.

cara INSTaLNYa
Pastikan  memiliki Node.js dan npm terinstal
 unduh repositori ini ke komputer .

 Buka terminal, arahkan ke direktori proyek, dan jalankan perintah berikut untuk menginstal semua dependensi:
 JLNKN INI:
 npm install

Pastikan Anda memiliki emulator atau perangkat fisik yang terhubung untuk menjalankan aplikasi React Native.

npx react-native run-android


KLO DI IOS aTaU DI MaC
npx react-native run-ios


Penggunaan
Setelah aplikasi dijalankan di emulator atau perangkat Anda, Anda akan melihat layar utama dengan daftar tugas.
Gunakan input di bagian atas untuk menambahkan tugas baru. Tekan tombol "Tambah" untuk menyimpan tugas.
Anda dapat menekan tugas untuk menandainya sebagai selesai atau belum selesai.
Untuk menghapus tugas, geser ke kiri pada tugas yang ingin Anda hapus dan tekan tombol "Hapus".



TECH STACK YANG AKU PAKAI:

React Native:FRMEWORK JVSCRIPT UNTUK MENGEMBNGKN MOBILE ANDROID

AsyncStorage: Digunakan untuk menyimpan data tugas secara lokal DI BROWSER/MOBILE
FlatList: Komponen untuk menampilkan daftar tugas  YNG LEBIH baik
Context API: Digunakan untuk berbagi fungsi antara komponen /MELEMPAR DATA DI BERBAGAI KOMPONEN -->
