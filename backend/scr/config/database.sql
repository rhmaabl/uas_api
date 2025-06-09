-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Jun 2025 pada 06.47
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restoran`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `created_at`, `updated_at`) VALUES
(1, 'Main Course', '2025-06-08 14:07:45', '2025-06-08 14:07:45'),
(2, 'Dessert', '2025-06-08 14:07:45', '2025-06-08 14:07:45'),
(3, 'Drink', '2025-06-08 14:07:45', '2025-06-08 14:07:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `gambar` text DEFAULT NULL,
  `Jumlah` int(11) DEFAULT NULL,
  `id_kategori` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id_menu`, `nama`, `harga`, `gambar`, `Jumlah`, `id_kategori`, `id_user`, `created_at`, `updated_at`) VALUES
(1, 'Nasi Goreng Fresh', 42564, 'https://source.unsplash.com/400x300/?maincourse-732', 1, 1, 1, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(2, 'Ayam Bakar Hot', 65404, 'https://source.unsplash.com/400x300/?maincourse-99', 1, 1, 2, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(3, 'Mie Goreng Premium', 45043, 'https://source.unsplash.com/400x300/?maincourse-899', 1, 1, 3, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(4, 'Beef Steak Fresh', 32767, 'https://source.unsplash.com/400x300/?maincourse-304', 1, 1, 4, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(5, 'Chicken Katsu Fresh', 27997, 'https://source.unsplash.com/400x300/?maincourse-862', 1, 1, 5, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(6, 'Sate Ayam Fresh', 55697, 'https://source.unsplash.com/400x300/?maincourse-462', 1, 1, 6, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(7, 'Soto Ayam Fresh', 50000, 'https://source.unsplash.com/400x300/?maincourse-269', 1, 1, 7, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(8, 'Bakso Urat Original', 39025, 'https://source.unsplash.com/400x300/?maincourse-193', 1, 1, 8, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(9, 'Ikan Bakar Special', 41025, 'https://source.unsplash.com/400x300/?maincourse-62', 1, 1, 9, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(10, 'Spaghetti Bolognese Fresh', 57545, 'https://source.unsplash.com/400x300/?maincourse-182', 1, 1, 10, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(11, 'Chicken Teriyaki Hot', 54777, 'https://source.unsplash.com/400x300/?maincourse-995', 1, 1, 0, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(12, 'Sup Daging Premium', 55435, 'https://source.unsplash.com/400x300/?maincourse-401', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(13, 'Nasi Kuning Premium', 49179, 'https://source.unsplash.com/400x300/?maincourse-626', 1, 1, 6, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(14, 'Rendang Original', 29268, 'https://source.unsplash.com/400x300/?maincourse-161', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(15, 'Gado-Gado Special', 35008, 'https://source.unsplash.com/400x300/?maincourse-524', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(16, 'Pecel Lele Hot', 33325, 'https://source.unsplash.com/400x300/?maincourse-6', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(17, 'Rawon Premium', 45130, 'https://source.unsplash.com/400x300/?maincourse-567', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(18, 'Tongseng Kambing Hot', 43680, 'https://source.unsplash.com/400x300/?maincourse-482', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(19, 'Capcay Goreng Original', 39865, 'https://source.unsplash.com/400x300/?maincourse-180', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(20, 'Sop Buntut Special', 45015, 'https://source.unsplash.com/400x300/?maincourse-581', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(21, 'Nasi Goreng Fresh', 46731, 'https://source.unsplash.com/400x300/?maincourse-115', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(22, 'Ayam Bakar Fresh', 41253, 'https://source.unsplash.com/400x300/?maincourse-838', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(23, 'Mie Goreng Hot', 26240, 'https://source.unsplash.com/400x300/?maincourse-409', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(24, 'Beef Steak Premium', 60534, 'https://source.unsplash.com/400x300/?maincourse-192', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(25, 'Chicken Katsu Original', 68303, 'https://source.unsplash.com/400x300/?maincourse-400', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(26, 'Sate Ayam Fresh', 56971, 'https://source.unsplash.com/400x300/?maincourse-34', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(27, 'Soto Ayam Fresh', 40498, 'https://source.unsplash.com/400x300/?maincourse-177', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(28, 'Bakso Urat Original', 55449, 'https://source.unsplash.com/400x300/?maincourse-245', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(29, 'Ikan Bakar Fresh', 67899, 'https://source.unsplash.com/400x300/?maincourse-836', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(30, 'Spaghetti Bolognese Original', 41934, 'https://source.unsplash.com/400x300/?maincourse-262', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(31, 'Chicken Teriyaki Premium', 41208, 'https://source.unsplash.com/400x300/?maincourse-2', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(32, 'Sup Daging Premium', 66819, 'https://source.unsplash.com/400x300/?maincourse-43', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(33, 'Nasi Kuning Original', 49299, 'https://source.unsplash.com/400x300/?maincourse-791', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(34, 'Rendang Hot', 32772, 'https://source.unsplash.com/400x300/?maincourse-429', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(35, 'Gado-Gado Premium', 30023, 'https://source.unsplash.com/400x300/?maincourse-116', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(36, 'Pecel Lele Special', 57722, 'https://source.unsplash.com/400x300/?maincourse-97', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(37, 'Rawon Fresh', 65356, 'https://source.unsplash.com/400x300/?maincourse-388', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(38, 'Tongseng Kambing Fresh', 64576, 'https://source.unsplash.com/400x300/?maincourse-212', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(39, 'Capcay Goreng Special', 43508, 'https://source.unsplash.com/400x300/?maincourse-580', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(40, 'Sop Buntut Hot', 45505, 'https://source.unsplash.com/400x300/?maincourse-530', 1, 1, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(41, 'Es Teler Original', 16673, 'https://source.unsplash.com/400x300/?dessert-723', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(42, 'Klepon Fresh', 16772, 'https://source.unsplash.com/400x300/?dessert-288', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(43, 'Dadar Gulung Hot', 17285, 'https://source.unsplash.com/400x300/?dessert-215', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(44, 'Puding Coklat Special', 21704, 'https://source.unsplash.com/400x300/?dessert-585', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(45, 'Es Doger Special', 21456, 'https://source.unsplash.com/400x300/?dessert-621', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(46, 'Kue Lapis Fresh', 29304, 'https://source.unsplash.com/400x300/?dessert-627', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(47, 'Bubur Ketan Hitam Original', 14267, 'https://source.unsplash.com/400x300/?dessert-249', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(48, 'Pisang Goreng Hot', 26505, 'https://source.unsplash.com/400x300/?dessert-852', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(49, 'Martabak Manis Fresh', 10782, 'https://source.unsplash.com/400x300/?dessert-378', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(50, 'Brownies Hot', 20122, 'https://source.unsplash.com/400x300/?dessert-43', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(51, 'Tiramisu Special', 14946, 'https://source.unsplash.com/400x300/?dessert-680', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(52, 'Cheesecake Hot', 18287, 'https://source.unsplash.com/400x300/?dessert-326', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(53, 'Es Krim Vanila Hot', 10217, 'https://source.unsplash.com/400x300/?dessert-128', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(54, 'Cendol Original', 17650, 'https://source.unsplash.com/400x300/?dessert-650', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(55, 'Kolak Pisang Hot', 11131, 'https://source.unsplash.com/400x300/?dessert-645', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(56, 'Es Teler Hot', 24865, 'https://source.unsplash.com/400x300/?dessert-637', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(57, 'Klepon Premium', 22745, 'https://source.unsplash.com/400x300/?dessert-293', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(58, 'Dadar Gulung Hot', 24398, 'https://source.unsplash.com/400x300/?dessert-792', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(59, 'Puding Coklat Fresh', 23708, 'https://source.unsplash.com/400x300/?dessert-250', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(60, 'Es Doger Hot', 25177, 'https://source.unsplash.com/400x300/?dessert-622', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(61, 'Kue Lapis Hot', 16973, 'https://source.unsplash.com/400x300/?dessert-233', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(62, 'Bubur Ketan Hitam Special', 19514, 'https://source.unsplash.com/400x300/?dessert-849', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(63, 'Pisang Goreng Original', 26279, 'https://source.unsplash.com/400x300/?dessert-856', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(64, 'Martabak Manis Special', 16143, 'https://source.unsplash.com/400x300/?dessert-621', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(65, 'Brownies Hot', 16652, 'https://source.unsplash.com/400x300/?dessert-897', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(66, 'Tiramisu Hot', 27046, 'https://source.unsplash.com/400x300/?dessert-984', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(67, 'Cheesecake Fresh', 17787, 'https://source.unsplash.com/400x300/?dessert-475', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(68, 'Es Krim Vanila Special', 19791, 'https://source.unsplash.com/400x300/?dessert-212', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(69, 'Cendol Special', 25950, 'https://source.unsplash.com/400x300/?dessert-342', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(70, 'Kolak Pisang Premium', 27514, 'https://source.unsplash.com/400x300/?dessert-82', 1, 2, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(71, 'Es Teh Manis Hot', 12601, 'https://source.unsplash.com/400x300/?drink-962', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(72, 'Jus Alpukat Fresh', 19186, 'https://source.unsplash.com/400x300/?drink-306', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(73, 'Kopi Hitam Fresh', 17492, 'https://source.unsplash.com/400x300/?drink-280', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(74, 'Es Jeruk Hot', 12196, 'https://source.unsplash.com/400x300/?drink-127', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(75, 'Soda Gembira Fresh', 15723, 'https://source.unsplash.com/400x300/?drink-702', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(76, 'Teh Tarik Original', 8211, 'https://source.unsplash.com/400x300/?drink-872', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(77, 'Jus Mangga Original', 14730, 'https://source.unsplash.com/400x300/?drink-58', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(78, 'Air Mineral Fresh', 10213, 'https://source.unsplash.com/400x300/?drink-961', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(79, 'Milkshake Coklat Original', 9040, 'https://source.unsplash.com/400x300/?drink-869', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(80, 'Thai Tea Fresh', 16985, 'https://source.unsplash.com/400x300/?drink-49', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(81, 'Cappuccino Fresh', 15371, 'https://source.unsplash.com/400x300/?drink-860', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(82, 'Jus Semangka Premium', 11050, 'https://source.unsplash.com/400x300/?drink-472', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(83, 'Matcha Latte Original', 19488, 'https://source.unsplash.com/400x300/?drink-770', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(84, 'Lemon Tea Premium', 12676, 'https://source.unsplash.com/400x300/?drink-393', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(85, 'Infused Water Original', 12519, 'https://source.unsplash.com/400x300/?drink-165', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(86, 'Es Teh Manis Hot', 11506, 'https://source.unsplash.com/400x300/?drink-463', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(87, 'Jus Alpukat Fresh', 14097, 'https://source.unsplash.com/400x300/?drink-128', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(88, 'Kopi Hitam Fresh', 14176, 'https://source.unsplash.com/400x300/?drink-267', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(89, 'Es Jeruk Premium', 14128, 'https://source.unsplash.com/400x300/?drink-811', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(90, 'Soda Gembira Original', 8965, 'https://source.unsplash.com/400x300/?drink-131', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(91, 'Teh Tarik Premium', 19747, 'https://source.unsplash.com/400x300/?drink-828', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(92, 'Jus Mangga Hot', 13960, 'https://source.unsplash.com/400x300/?drink-436', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(93, 'Air Mineral Special', 13022, 'https://source.unsplash.com/400x300/?drink-424', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(94, 'Milkshake Coklat Fresh', 16214, 'https://source.unsplash.com/400x300/?drink-29', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(95, 'Thai Tea Hot', 14721, 'https://source.unsplash.com/400x300/?drink-27', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(96, 'Cappuccino Original', 17229, 'https://source.unsplash.com/400x300/?drink-790', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(97, 'Jus Semangka Special', 16993, 'https://source.unsplash.com/400x300/?drink-719', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(98, 'Matcha Latte Fresh', 13928, 'https://source.unsplash.com/400x300/?drink-314', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(99, 'Lemon Tea Fresh', 16483, 'https://source.unsplash.com/400x300/?drink-779', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(100, 'Infused Water Hot', 14276, 'https://source.unsplash.com/400x300/?drink-771', 1, 3, NULL, '2025-06-08 14:09:38', '2025-06-08 14:09:38'),
(183, 'Daging Lada Hitam', 25000, 'nasi-goreng.jpg', NULL, 1, NULL, '2025-06-08 15:40:22', '2025-06-08 15:40:22'),
(185, 'Kebab', 20000, 'kebab.jpg', NULL, 2, 6, '2025-06-09 01:33:03', '2025-06-09 01:33:03'),
(187, 'Boba Tea', 23000, 'boba.jpg', NULL, 3, 6, '2025-06-09 01:40:11', '2025-06-09 01:40:11'),
(188, 'Jasmin Tea', 15000, 'tea.jpg', NULL, 3, NULL, '2025-06-09 01:44:11', '2025-06-09 01:44:11'),
(189, 'Jasmin Tea', 15000, 'tea.jpg', 2, 3, 6, '2025-06-09 02:10:14', '2025-06-09 02:10:14');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order`
--

CREATE TABLE `order` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `status` enum('pending','diproses','selesai','dibatalkan') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `order`
--

INSERT INTO `order` (`id_order`, `id_user`, `status`, `created_at`, `updated_at`) VALUES
(10, 7, 'pending', '2025-06-09 02:32:57', '2025-06-09 02:32:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_item`
--

CREATE TABLE `order_item` (
  `id_order_item` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_satuan` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `order_item`
--

INSERT INTO `order_item` (`id_order_item`, `id_order`, `id_menu`, `jumlah`, `harga_satuan`, `subtotal`, `created_at`) VALUES
(27, 10, 7, 6, 50000.00, 0.00, '2025-06-09 02:32:57');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment`
--

CREATE TABLE `payment` (
  `id_payment` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metode` varchar(50) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `status` enum('pending','paid','failed') DEFAULT 'pending',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `payment`
--

INSERT INTO `payment` (`id_payment`, `id_order`, `total`, `metode`, `customer`, `status`, `created_at`) VALUES
(7, 1, 50000.00, 'BCA', 'bayu', 'pending', '2025-06-09 03:23:46'),
(8, 1, 100000.00, 'BCA', 'raja', 'pending', '2025-06-09 03:25:41');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `role` enum('admin','kasir','owner') DEFAULT 'kasir',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `email`, `token`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin1', '$2b$10$1jW6pV23Su/amzyl.jvaOuZ0LpBH01CheHhSvvpZlXV5iSZS1C5P2', 'admin@example.com', '', 'admin', '2025-06-07 16:06:19', '2025-06-08 14:04:21'),
(2, 'kasir1', 'de28f8f7998f23ab4194b51a6029416f', 'kasir@example.com', '', 'kasir', '2025-06-07 16:06:19', '2025-06-08 14:04:21'),
(3, 'rani', '$2b$10$6LbIZXkhLzOqUQNpFhnk..KJVxjHGHISRgEkbH4nWXz.INhLJ2i6K', 'rani@gmail.com', '', 'kasir', '2025-06-08 16:20:00', '2025-06-08 16:20:00'),
(4, 'yani', '$2b$10$yebsA0UhIuNKzK/sP6VsFuIFk4YoIsHMPSJmChyCZWqulBJdtjdf2', 'yani@gmail.com', '', 'admin', '2025-06-08 16:26:06', '2025-06-08 16:26:06'),
(5, 'yeye', '$2b$10$Fw.vSVMg7jskJQiAZQFobOY8GARpkSYXePW0v6wy9aFQdRi2q/xVC', 'yeye@gmail.com', '', 'admin', '2025-06-08 16:33:18', '2025-06-08 16:33:18'),
(6, 'dilla', '$2b$10$4bzOOS91uLdptgwNB0gaV..5LaWl2KOec/fwbBWz0rsM8rhjZuoa.', 'dilla@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJkaWxsYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0OTQwMDk1NiwiZXhwIjoxNzQ5NDg3MzU2fQ.cOh6jGDJVL53OWDkmKFqBFpqRCHhiSvDAjPDJykyrQw', 'admin', '2025-06-08 16:40:48', '2025-06-08 16:40:48'),
(7, 'bayu', '$2b$10$ISVZEZkfj0TmFy6BCMA1OeLT6rsBkZwr8/1mwPa8mA3Aq8ffJeROu', 'bayu@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJiYXl1Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ5NDM1NjQ1LCJleHAiOjE3NDk1MjIwNDV9.TQJxUxmY8fQltzzYvXJou0-Ga-LtHw0J_epfGQ77TtA', 'admin', '2025-06-09 02:18:04', '2025-06-09 02:18:04');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`),
  ADD KEY `id_kategori` (`id_kategori`,`id_user`) USING BTREE;

--
-- Indeks untuk tabel `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`id_order_item`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indeks untuk tabel `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_payment`),
  ADD KEY `id_order` (`id_order`) USING BTREE;

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT untuk tabel `order`
--
ALTER TABLE `order`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `order_item`
--
ALTER TABLE `order_item`
  MODIFY `id_order_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order` (`id_order`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE;
COMMIT;


