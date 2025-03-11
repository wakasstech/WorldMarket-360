-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 24, 2024 at 12:38 PM
-- Server version: 10.6.18-MariaDB
-- PHP Version: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ccalerc_alfaryad_erc`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `postcode` varchar(30) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `revenue` varchar(150) DEFAULT '0',
  `password` varchar(150) NOT NULL,
  `intended_url` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `notes` longtext NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `allowed_websites` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `phone`, `city`, `state`, `postcode`, `address`, `email`, `email_verified_at`, `revenue`, `password`, `intended_url`, `remember_token`, `notes`, `deleted_at`, `created_at`, `updated_at`, `status`, `allowed_websites`) VALUES
(4, 'Rana', 'Afaaq', '00000000000', '00', '00', '00', 'Kansas St\r\n50', 'ranaafaaq197@gmail.com', '2020-07-17 21:02:41', NULL, '$2y$10$9SmYUS9cQ16mSTBpLlJBcO3RgEmxgLBne3TOrGgijEYSuXTNPizk6', 'http://stevemajka.test', 'l80pvsvQBcjTHhEM48BL9LwqUIqLpAsAJOuy8ojN4XaWQwqiSAGnVjME9jXL', '', NULL, '2020-07-17 20:07:39', '2023-05-31 01:51:11', NULL, NULL),
(21, 'Mysha', 'Harold', NULL, NULL, NULL, NULL, NULL, 'mharold@erczone.com', NULL, '13485', '$2y$10$D4HqdSJ.35RC6ROQG1lKPe9NNmENqFj7FULjCiWxvmA5X.46Z8sbW', '/', NULL, '', NULL, '2021-12-29 19:09:08', '2023-12-22 00:41:55', 'unrevoked', ''),
(22, 'Michelle', 'Porter', NULL, NULL, NULL, NULL, NULL, 'michellestark28@gmail.com', NULL, '0', '$2y$10$35d8ZZSDiTzRtU17SKKfuO6MbszrF72RzyH5ph0Ct8QqASoGIcubu', '/', NULL, '', NULL, '2021-12-31 12:24:31', '2023-09-15 17:33:43', 'unrevoked', 'ccalerc.com, laepserc.com, erczone.com, checkmate-strategieserc.com'),
(32, 'Gloria', 'Hahn', '+1 (661) 959-8901', 'Et explicabo Dolor', 'Elit atque amet in', NULL, 'In irure alias imped', 'dyzexapugy@mailinator.com', NULL, '0', '$2y$10$8HY6ip4rdXxRm7/IgoXzZuOIs1QlSYOwkehybSZSv3yfXebH5DE/e', '/', NULL, '', '2023-04-24 01:34:32', '2023-02-21 12:31:07', '2023-04-24 01:34:32', NULL, NULL),
(34, 'Areeba', 'name', '123', 'xyz', 'xyz', NULL, 'abc', 'user@gmail.com', NULL, '0', '$2y$10$an0N/h73S6hLT1C2gK293uxJvekyNzyosymaGdPw8VfZoxxhN6Lza', '/', NULL, '', '2023-04-24 01:05:02', '2023-03-28 11:53:13', '2023-04-24 01:05:02', NULL, NULL),
(35, 'user12345', 'Naz', '123', 'abc', 'wxyz', NULL, 'qw', 'areebanaz018@gmail.com', NULL, '0', '$2y$10$CDc/8Gdkb7LPBes4mtuvHOHoJZrkdHPUtISEg7UJMav0yn4iIBHHC', '/', NULL, '', '2023-04-24 01:05:19', '2023-03-28 14:27:43', '2023-04-24 01:05:19', NULL, NULL),
(36, 'test', 'test', '341-98-447', 'Islamabad', 'TEST', NULL, 'test', 'test@gmail.com', NULL, '0', '$2y$10$6YJtFjCwR4bWs3PeB7PAhe46g3Zr3x27fdP/W80WzGmIPa6fUpOT.', '/', NULL, '', '2023-09-29 00:21:32', '2023-04-19 10:07:10', '2023-09-29 00:21:32', NULL, NULL),
(37, 'testaff', 'testaff', '234234234', 'test', 'TEST', NULL, 'testaff', 'testaff@gmail.com', NULL, '0', '$2y$10$TwYszRURYbt.AJQt1epe.eBmxapFgvW3ceEGiMCk.1CFyVc.xAhqO', '/', NULL, '', '2023-05-22 15:49:23', '2023-05-20 23:42:57', '2023-05-22 15:49:23', NULL, NULL),
(38, 'caleb', 'caleb', '123456789', 'pakistan', 'pakistan', NULL, 'pakistan', 'office@erczone.com', NULL, '0', '$2y$10$S0cRrr3tTm1gNJAt09T0UOUciwJWxI5YraLAquO5Hz7m1t3bEkgdW', '/', NULL, '', '2023-09-29 00:30:49', '2023-05-21 13:09:47', '2023-09-29 00:30:49', NULL, NULL),
(44, 'Mulry', 'john', '3342342342', 'Islamabad', 'Pakistan', NULL, 'Islamabad', 'mulryjohn@gmail.com', NULL, '0', '$2y$10$K5fSb3CQBhsqnrFPu8gTUu6TuRE2CRnApmyi9hHkdXVkIPhWT3Xdy', '/', NULL, '', NULL, '2023-05-23 23:53:11', '2023-05-25 20:22:30', NULL, NULL),
(45, 'erc', 'erc', NULL, NULL, NULL, NULL, NULL, 'erc@yopmail.com', NULL, '0', '$2y$10$VVGUN5TRMxA9JnlOoRXRBOLMM/N/ajG5mfcjYUoQd.NVC3TD1CDL2', '/', NULL, '', '2023-09-29 00:31:50', '2023-07-12 23:54:12', '2023-09-29 00:31:50', NULL, NULL),
(46, 'Amir', 'Shahzad', '00000000000', '00', '00', '00', 'Kansas St\r\n50', 'amirshahzadkhawar@gmail.com', '2020-07-17 21:02:41', NULL, '$2y$10$UdldZNSMa2uCndyX7t5N/OX14Ff2ESdfbjz9RllY.XjTdTXbwYhHO', 'http://stevemajka.test', 'xg5wZkTBNXWpN8UZMNIocw51GJ8QmEN8KHJqlHlA6NSkrMRMGR8HPeUdiswc', '', NULL, '2023-07-26 20:07:39', '2023-07-26 17:17:09', NULL, NULL),
(47, 'oldKatina', 'Ndlovu', '0', '0', '0', NULL, '0', 'oldkatinao@erczone.com', NULL, '0', '$2y$10$c.o8Zmignrqy4XPpGPK4D.dFXGgow/FCFPaXdU/qYflAL4RY9emLO', '/', NULL, '', NULL, '2023-07-26 17:54:29', '2023-11-11 05:13:23', NULL, 'setczone.com'),
(48, 'Hiroko', 'Hewitt', '+1 (784) 983-5085', 'Culpa mollit accusa', 'Nemo cum id tempora', NULL, 'Elit anim illo volu', 'muhammadrizwanyaseen2@gmail.com', NULL, '0', '$2y$10$OJp8GYzbsGdYoVmzxnLg0.G35WhTpB7lprABZszJijC8GFIUFZcBG', '/', NULL, '', '2023-09-29 00:32:02', '2023-09-14 18:40:37', '2023-09-29 00:32:02', 'unrevoked', 'laepserc.com, ercmsstaceyb.com, lampaerc.com'),
(49, 'abc', 'Delacruz', '+1 (115) 752-6727', NULL, NULL, NULL, NULL, 'abc@gmail.com', NULL, '0', '$2y$10$tK6AMv7kcHSM47twmGMB3.bIKZ65YL2kKaEz00AzY0gt5DAARn4oy', '/', NULL, '', '2023-09-29 00:32:17', '2023-09-21 22:28:12', '2023-09-29 00:32:17', NULL, NULL),
(50, 'Kyra', 'Roach', '+1 (382) 955-4875', 'Ut totam eveniet si', 'Veritatis tempor in', NULL, 'In sint consequatur', 'ryle@mailinator.com', NULL, '0', '$2y$10$Bi4.6jIQwmrRPT7v.lYKLO6f/tIUQKt/fMRnNvz82JoWlCGjp1Mey', '/', NULL, '', '2023-09-29 00:32:24', '2023-09-29 00:19:06', '2023-09-29 00:32:24', NULL, NULL),
(51, 'Kiona', 'Fernandez', '+1 (725) 377-6415', 'Non sit sit omnis e', 'Alias veniam in pos', NULL, 'Praesentium corrupti', 'nagetoxafy@mailinator.com', NULL, '0', '$2y$10$y8VlN.f.rTqw14k.h.ozUuiacisgRl1wwTgSCLZrpXSPeyQcknyoi', '/', NULL, '', '2023-09-30 02:34:02', '2023-09-29 00:28:02', '2023-09-30 02:34:02', NULL, NULL),
(52, 'Bobby', 'Gilstrap', '+1 (237) 338-5291', 'Ullam optio eos al', 'GA', NULL, 'Nulla quasi officia', 'bobby@erczone.com', NULL, '76928', '$2y$10$ew0Ukl0qoY0guteoNrsmHuMLhm/jJfRVQipjhrwWC6fem7TSrRWme', '/', NULL, '', NULL, '2023-09-29 00:35:44', '2023-12-28 04:08:33', NULL, 'ercchurches.com'),
(53, 'Lynn', 'Ferrin', '+1 (272) 896-3707', 'Voluptatem consecte', 'UT', NULL, 'Maiores irure neque', 'lynn@erczone.com', NULL, '0', '$2y$10$pS5x6bwPg1d77N6X2dj5iOACK0mHpavoPSeSPOLCJS5Bi02ikGHOa', '/', NULL, '', NULL, '2023-09-29 00:36:47', '2023-12-28 04:08:52', NULL, ''),
(54, 'Neil', 'neil', '+1 (889) 759-1924', 'Qui quae sequi do ut', 'Dolorem vel id est', NULL, 'Reprehenderit et po', 'neil@erczone.com', NULL, '0', '$2y$10$hr2R2NByz0naoStOcdKbxOsUmc0ApTO/CLVK4NgRZOQTl6eVqZva.', '/', NULL, '', NULL, '2023-09-29 00:37:52', '2023-09-30 02:35:59', NULL, 'usyserc.com, rushsoccererc.com, wpslerc.com, ohioyserc.com, illinoisyserc.com, tnsoccererc.com, arkansasyserc.com, Wvsoccererc.com'),
(56, 'Dporter', 'Dporter', '+1 (772) 871-3101', 'Harum in quidem veni', 'Dolores et ut qui ei', NULL, 'Deserunt cupiditate', 'dporter@erczone.com', NULL, '0', '$2y$10$zXPTIdC0dC6XHLAnYjTxieC/Bcb2CMhMzHidDJWvV4qWfw.hi20H2', '/', NULL, '', NULL, '2023-09-29 00:41:06', '2023-09-29 00:41:57', NULL, ''),
(57, 'Cindy', 'bishop', '+1 (811) 265-5767', 'Incididunt iusto sed', 'Beatae consequatur', NULL, 'Laudantium placeat', 'cindy.bishop@checkmate-strategies.com', NULL, '0', '$2y$10$tPdNs4hkxlX2OaRCltxhF.iLV6XIvLQDN2VlU2X6eVnwyUZRrnGmS', '/', NULL, '', NULL, '2023-09-29 00:48:23', '2023-09-30 02:38:18', NULL, 'cmserc.com'),
(58, 'Janeen', 'J', '+1(123) 456 7890', NULL, NULL, NULL, NULL, 'janeen@erczone.com', NULL, '0', '$2y$10$b/.EQ6U8hdOCsYdXMCxhAeHw7.XMb/uv/pk2YQkMXGZ1Q1JwXYK66', '/', NULL, '', NULL, '2023-09-29 18:54:24', '2023-09-30 02:40:12', NULL, NULL),
(59, 'Rizwans', 'Walker', '+1 (857) 814-1715', 'Illum voluptate mol', 'Soluta incidunt in', NULL, 'Rwaal sdsd sd', 'xativiha@mailinator.com', NULL, '0', '$2y$10$e0JOMkRlfNeXKqgPs6XG5OIQ66nFyO/B5CTdYiGDWF8AW7tCxCsBS', '/', NULL, '', NULL, '2023-10-04 18:44:45', '2023-11-12 17:35:24', NULL, 'lascaerc.com, ercmsstaceyb.com, lampaerc.com, setczone.com'),
(60, 'Amanda', 'Amanda', '123456789', 'Labore sunt eum rer', 'Illum tenetur venia', NULL, '109 North Hague Parkway', 'Amanda@erczone.com', NULL, '0', '$2y$10$WtdaCr1dxPdk3kwMyiSSZeCOa9lNHoqndJLArUwe7JWb5oqGBOUEy', '/', NULL, '', NULL, '2023-10-09 17:30:49', '2023-10-09 17:31:18', NULL, ''),
(61, 'Katina', 'Ndlovu', '123456789', NULL, NULL, NULL, NULL, 'katina@erczone.com', NULL, '0', '$2y$10$W3rRkCDJmY9z5Cu.KwNv0eFK.KDJuT9SwTQRcQGORryd5l5q4.jkS', '/', NULL, '', NULL, '2023-11-13 01:24:38', '2023-11-13 05:43:36', NULL, NULL),
(62, 'John', 'John', '0000000', '0000000', '0000000000', NULL, '000000000', 'analytics@gmail.com', NULL, '0', '$2y$10$ew0Ukl0qoY0guteoNrsmHuMLhm/jJfRVQipjhrwWC6fem7TSrRWme', '/', NULL, '', NULL, '2024-01-08 06:04:55', '2024-03-15 17:12:11', NULL, NULL),
(63, 'john', 'john', '+1 (895) 917-9175', 'Ipsam velit voluptat', 'Id labore quam disti', NULL, 'Commodi magnam molli', 'johnjohn@gmail.com', NULL, '0', '$2y$10$uRa.uOgBSUfxTEXBvWjPF.O9VL/wjExsTK748oc34YJAa11AOwMoO', '/', NULL, '', NULL, '2024-01-15 18:59:06', '2024-01-15 18:59:06', NULL, NULL),
(64, 'Mailer', 'mailer', '+1 (343) 789-5198', 'Sit id incididunt', 'In nobis quia dolore', NULL, 'Quam et qui quas ea', 'mailer@setczone.com', NULL, '0', '$2y$10$Ka4zMooh6XhJlseBhNf5juIE607apZC8vfO2JV7u7iAqeCDxVLEAO', '/', NULL, '', NULL, '2024-03-28 00:57:16', '2024-03-28 00:57:42', NULL, NULL),
(65, 'fefe', 'efewfehjhj', NULL, NULL, NULL, NULL, NULL, 'ariefariefwijayadi@gmail.com', NULL, '0', '$2y$10$JLtEJwUNBuRS3d5aVcXRvuG035Ax25SVRgQbMD7FRfr/Ec5Gf5P.W', '/', NULL, '', NULL, '2024-03-28 03:03:28', '2024-03-28 03:03:28', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
