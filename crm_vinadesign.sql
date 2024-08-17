-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 17, 2024 at 03:36 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm_vinadesign`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cart_items_table`
--

CREATE TABLE `Cart_items_table` (
  `cart_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_specification` varchar(255) NOT NULL,
  `total_money` decimal(10,2) NOT NULL,
  `note` text NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `staff_name` varchar(100) NOT NULL,
  `designer` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `product_details` text DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_timing` datetime NOT NULL,
  `delivery_method` varchar(50) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `amount_to_pay` decimal(10,2) NOT NULL,
  `deposited` int(11) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` text DEFAULT NULL,
  `delivery_company` text NOT NULL,
  `delivery_fee` decimal(11,0) NOT NULL,
  `payment_method_2` varchar(50) DEFAULT NULL,
  `payment_timing_2` datetime DEFAULT NULL,
  `deposited_2` decimal(10,2) DEFAULT NULL,
  `payment_method_3` varchar(50) DEFAULT NULL,
  `payment_timing_3` datetime DEFAULT NULL,
  `deposited_3` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `staff_name`, `designer`, `customer_name`, `phone_no`, `product_details`, `payment_method`, `payment_timing`, `delivery_method`, `discount`, `amount_to_pay`, `deposited`, `note`, `created_at`, `status`, `delivery_company`, `delivery_fee`, `payment_method_2`, `payment_timing_2`, `deposited_2`, `payment_method_3`, `payment_timing_3`, `deposited_3`) VALUES
(89, 'John Doe', 'Designer X', 'Customer Y', '1234567890', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":100,\"note\":\"\"}]', 'Credit Card', '0000-00-00 00:00:00', 'Delivery', 0.00, 100.00, 0, 'Test note', '2024-08-07 19:33:16', '', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(95, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":3850,\"note\":\"\"}]', '', '0000-00-00 00:00:00', '', 0.00, 0.00, 0, '', '2024-08-08 04:42:57', 'completed', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(96, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"},{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":300,\"note\":\"\"}]', '', '0000-00-00 00:00:00', '', 0.00, 0.00, 0, '', '2024-08-12 05:07:58', '', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(97, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', '', '0000-00-00 00:00:00', '', 0.00, 125.00, 0, '', '2024-08-12 08:16:48', '', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(98, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', '', '0000-00-00 00:00:00', '', 12.00, 125.00, 0, '', '2024-08-12 08:16:55', '', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(99, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', 'transaction', '0000-00-00 00:00:00', 'pickup', 20.00, 105.00, 0, '', '2024-08-12 10:02:21', '', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(100, 'Anh', 'anh', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', 'cash', '0000-00-00 00:00:00', 'delivery', 0.00, 125.00, 0, 'Npte', '2024-08-12 10:29:49', 'Completed', '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(106, 'Anh', 'anh', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', 'cash', '0000-00-00 00:00:00', 'pickup', 0.00, 113.00, 60, 'note', '2024-08-13 18:48:18', NULL, '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(107, '', '', '', '', '', 'cash', '2024-08-15 00:00:00', 'delivery', 0.00, 0.00, 12, '', '2024-08-14 17:27:08', NULL, 'grab', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(108, 'Anh', 'anh', 'Tâm', '3456', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', 'cash', '2024-08-16 00:00:00', 'pickup', 12.00, 101.00, 12, 'Npte', '2024-08-14 19:19:15', NULL, '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(109, 'Anh', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', 'transaction', '2024-08-16 00:00:00', 'pickup', 2.00, 111.00, 12, 'note', '2024-08-16 02:29:19', NULL, '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(110, 'Mai', 'Hoang', 'Lý', '087162534', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":135,\"note\":\"\"}]', 'cash', '2024-08-16 00:00:00', 'pickup', 5.00, 118.00, 12, 'note', '2024-08-16 08:36:58', NULL, '', 0, NULL, NULL, NULL, NULL, NULL, NULL),
(111, 'moh', 'Hoang', 'Tâm', '0978123', '[{\"productName\":\"DECAL 2 mặt\",\"productSpecification\":\"Có bế\",\"totalMoney\":815,\"note\":\"\"}]', 'cash', '2024-08-17 00:00:00', 'delivery', 20.00, 765.00, 30, 'Npte', '2024-08-16 17:15:42', NULL, 'Grab', 20, NULL, NULL, NULL, NULL, NULL, NULL),
(112, 'Mai', 'anh', 'moh', '087824667', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":375,\"note\":\"\"}]', 'transaction', '2024-08-17 00:00:00', 'delivery', 0.00, 375.00, 30, 'Npte', '2024-08-16 17:17:46', NULL, 'Grab', 20, NULL, NULL, NULL, NULL, NULL, NULL),
(113, 'Mai', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":1100,\"note\":\"\"}]', 'cash', '2024-08-17 00:00:00', 'delivery', 0.00, 1100.00, 100, 'note', '2024-08-16 18:04:50', NULL, 'Grab', 20, NULL, NULL, NULL, NULL, NULL, NULL),
(114, 'Mai', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":1100,\"note\":\"\"}]', 'cash', '2024-08-17 00:00:00', 'delivery', 0.00, 1100.00, 100, 'note', '2024-08-16 18:06:45', NULL, 'Grab', 20, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_payments`
--

CREATE TABLE `order_payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_timing` datetime NOT NULL,
  `deposited` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_payments`
--

INSERT INTO `order_payments` (`payment_id`, `order_id`, `payment_method`, `payment_timing`, `deposited`) VALUES
(2, 107, 'credit card', '2024-08-15 10:00:00', 150.00);

-- --------------------------------------------------------

--
-- Table structure for table `pricefull`
--

CREATE TABLE `pricefull` (
  `product_id` int(11) NOT NULL,
  `calculation_methods` varchar(16) DEFAULT NULL,
  `product_name` varchar(21) DEFAULT NULL,
  `product_specification` varchar(62) DEFAULT NULL,
  `price_perm2` varchar(3) DEFAULT NULL,
  `price_per_unit` varchar(4) DEFAULT NULL,
  `extra_supply` varchar(3) DEFAULT NULL,
  `whole-sale` varchar(10) DEFAULT NULL,
  `max_side` int(10) DEFAULT NULL,
  `quantity frame` varchar(9) DEFAULT NULL,
  `Note` varchar(53) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pricefull`
--

INSERT INTO `pricefull` (`product_id`, `calculation_methods`, `product_name`, `product_specification`, `price_perm2`, `price_per_unit`, `extra_supply`, `whole-sale`, `max_side`, `quantity frame`, `Note`) VALUES
(1, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Chừa biên', '50', '', '25', 'undefined', 3, 'undefined', 'undefined'),
(2, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Đóng Khoen', '55', '', '25', '45', 3, '', ''),
(3, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Dán nối, Chừa biên', '60', '', '25', '50', 3, '', ''),
(4, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Dán nối, đóng khoen', '65', '', '25', '50', 3, '', ''),
(5, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Chừa biên', '55', '', '30', '50', 3, '', ''),
(6, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Đóng Khoen', '60', '', '30', '55', 3, '', ''),
(7, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Dán nối, Chừa biên', '65', '', '30', '60', 3, '', ''),
(8, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Dán nối, đóng khoen', '70', '', '30', '60', 3, '', ''),
(9, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Chừa biên', '65', '', '35', '50', 3, '', ''),
(10, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Đóng Khoen', '70', '', '35', '55', 3, '', ''),
(11, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Dán nối, Chừa biên', '75', '', '35', '60', 3, '', ''),
(12, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Dán nối, đóng khoen', '80', '', '35', '60', 0, '', ''),
(13, 'SP tính theo m', 'PP PP dầu', 'Không bế', '100', '', '0', '70', 0, '', ''),
(14, 'SP tính theo m', 'PP PP dầu', 'Có bế', '140', '', '0', '110', 0, '', ''),
(15, 'SP tính theo m', 'DECAL Sữa/Trong Dầu', 'Không bế', '110', '', '65', 'undefined', 0, 'undefined', 'undefined'),
(16, 'SP tính theo m', 'DECAL Sữa/Trong Dầu', 'Có bế', '150', '', '115', '90', 0, '', ''),
(17, 'SP tính theo m', 'DECAL Trong: in ngược', 'Không bế', '110', '', '65', '90', 0, '', ''),
(18, 'SP tính theo m', 'DECAL Trong: in ngược', 'Có bế', '130', '', '115', '90', 0, '', ''),
(19, 'SP tính theo m', 'DECAL Trong: in ngược', 'Cán lên decal sữa không bế', '185', '', '65', '90', 0, '', ''),
(20, 'SP tính theo m', 'DECAL Trong: in ngược', 'Cán lên decal sữa có bế', '250', '', '65', '90', 0, '', ''),
(21, 'SP tính theo m', 'DECAL Cát mờ- mực dầu', '', '165', '', '65', '90', 0, '', ''),
(22, 'SP tính theo m', 'DECAL 2 mặt', 'Có bế', '350', '', '115', '90', 0, '', ''),
(23, 'SP tính theo m', 'DECAL Sữa: mực dầu', 'Có bế, cán keo định hình', '350', '', '115', '90', 0, '', ''),
(24, 'SP tính theo m', 'DECAL Màu', 'Có bế, cán keo định hình', '250', '', '', '', 0, '', ''),
(25, 'SP tính theo m', 'CANVAS Mờ', 'Dầu/Silk (<147cm)', '150', '', '', '', 0, '', ''),
(26, 'SP tính theo m', 'CANVAS Bóng', 'Dầu/Silk (<147cm)', '150', '', '', '', 0, '', ''),
(27, 'SP tính theo m', 'CANVAS Dầu', 'Khổ lớn 3m', '185', '', '', '', 0, '', ''),
(28, 'SP tính theo m', 'Giấy Ảnh Dầu', '', '150', '', '', '', 0, '', ''),
(29, 'SP tính theo m', 'Baclitfilm Dầu', 'ko quy cách', '150', '', '', '', 0, '', ''),
(30, 'SP tính theo m', 'Baclitfilm Dầu', 'cán kéo', '200', '', '', '', 0, '', ''),
(31, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '200', '', '', 0, '5 hộp', 'có hàng 5-7 ngày'),
(32, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '250', '', '', 0, '10 hộp', 'có hàng 5-7 ngày'),
(33, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '500', '', '', 0, '20 hộp', 'có hàng 5-7 ngày'),
(34, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '1000', '', '', 0, '40 hộp', 'có hàng 5-7 ngày'),
(35, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '1500', '', '', 0, '60 hộp', 'có hàng 5-7 ngày'),
(36, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '2500', '', '', 0, '100 hộp', 'có hàng 5-7 ngày'),
(37, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '120', '', '', 0, '1-4 hộp', ''),
(38, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '110', '', '', 0, '5 hộp', ''),
(39, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '100', '', '', 0, '8 hộp', ''),
(40, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '95', '', '', 0, '10 hộp', ''),
(41, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '90', '', '', 0, '15 hộp ', ''),
(42, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '85', '', '', 0, '20 hộp', ''),
(43, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '320', '', '', 0, '5 hộp', 'có hàng 5-7 ngày'),
(44, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '190', '', '', 0, '10 hộp', 'có hàng 5-7 ngày'),
(45, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '136', '', '', 0, '20 hộp', 'có hàng 5-7 ngày'),
(46, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '135', '', '', 0, '40 hộp ', 'có hàng 5-7 ngày'),
(47, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '130', '', '', 0, '60 hộp', 'có hàng 5-7 ngày'),
(48, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '75', '', '', 0, '100 hộp', 'có hàng 5-7 ngày'),
(49, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '220', '', '', 0, '5 hộp', 'có hàng 5-7 ngày'),
(50, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '120', '', '', 0, '10 hộp ', 'có hàng 5-7 ngày'),
(51, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '110', '', '', 0, '20 hộp ', 'có hàng 5-7 ngày'),
(52, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '100', '', '', 0, '40 hộp', 'có hàng 5-7 ngày'),
(53, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '90', '', '', 0, '60 hộp', 'có hàng 5-7 ngày'),
(54, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '60', '', '', 0, '100 hộp', 'có hàng 5-7 ngày'),
(55, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '160', '', '', 0, '1-4 hộp', ''),
(56, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '150', '', '', 0, '5 hộp', ''),
(57, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '140', '', '', 0, '8 hộp', ''),
(58, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '130', '', '', 0, '10 hộp', ''),
(59, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '120', '', '', 0, '15 hộp ', ''),
(60, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '110', '', '', 0, '20 hộp', ''),
(61, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '200', '', '', 0, '1-4 hộp', ''),
(62, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '190', '', '', 0, '5 hộp', ''),
(63, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '180', '', '', 0, '8 hộp', ''),
(64, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '170', '', '', 0, '10 hộp', ''),
(65, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '160', '', '', 0, '15 hộp ', ''),
(66, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '150', '', '', 0, '20 hộp', ''),
(67, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '700', '', '', 0, '1000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(68, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1200', '', '', 0, '2000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(69, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1400', '', '', 0, '3000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(70, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '2100', '', '', 0, '5000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(71, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '3400', '', '', 0, '10000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(72, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1300', '', '', 0, '1000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(73, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1600', '', '', 0, '2000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(74, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '2000', '', '', 0, '3000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(75, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '2700', '', '', 0, '5000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(76, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '4000', '', '', 0, '10000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(77, NULL, 'PP', 'dai rong', '12', '', '12', '11', NULL, '2', 'Note'),
(78, NULL, 'Sp Test mơi', '', '30', '', '', '', NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('cX1HE4O2VLV6FuomSy-fJ9mYJe_vWmXe', 1723944408, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-08-17T16:49:08.897Z\",\"httpOnly\":true,\"path\":\"/\"},\"userEmail\":\"anne@vinadesign.vn\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `fullname`, `email`, `password`, `phone_no`) VALUES
(1, 'Anne Truong ', 's3978161@rmit.edu.vn', '$2b$10$MqbxYlTysilcCcX/hl3qpeTAKkrABRFD0V.lGkDiHcSLwg1Lh8l62', '917232367'),
(2, 'Anne Truong ', 'anne@vinadesign.vn', '$2b$10$HEoMu6isvxA6FINnlqGAg.1KfcOsP8IMNWQt.qQUIQkI4aIJreSl6', '123456789'),
(3, 'Quynh Anh', 'annetruongquynhanh@gmail.com', '$2b$10$X9vaetPZ1DER5PzP5NUo0OG4fsbPmB6SeeLwKYjnsp6zvpv/HIHiK', NULL),
(4, 'mohnish gupta', 'mohnish@gmail.com', '$2b$10$yEdwgw9.1KYFWUZR6yXGQ.vAtIkjSgv7xnH1xi.bkJNh5Rm8Ulic6', '34567890');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cart_items_table`
--
ALTER TABLE `Cart_items_table`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_payments`
--
ALTER TABLE `order_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_order` (`order_id`);

--
-- Indexes for table `pricefull`
--
ALTER TABLE `pricefull`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cart_items_table`
--
ALTER TABLE `Cart_items_table`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT for table `order_payments`
--
ALTER TABLE `order_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pricefull`
--
ALTER TABLE `pricefull`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_payments`
--
ALTER TABLE `order_payments`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
