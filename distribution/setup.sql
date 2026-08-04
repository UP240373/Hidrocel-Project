-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2026 at 07:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_hidrocel`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrators`
--

CREATE TABLE `administrators` (
  `id_admin` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `administrator_type` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Dumping data for table `administrators`
--

INSERT INTO `administrators` (`id_admin`, `name`, `last_name`, `phone`, `administrator_type`, `password`, `created_at`, `is_deleted`) VALUES
(2, 'Carlos', 'Macias', '123', 'Admin', 'carlos123', '2026-05-16 10:27:42', 0);

-- --------------------------------------------------------

--
-- Table structure for table `diagnostics`
--

CREATE TABLE `diagnostics` (
  `device` varchar(100) NOT NULL,
  `device_brand` varchar(100) NOT NULL,
  `device_color` varchar(100) NOT NULL,
  `device_type` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `contact_phone` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `device_password` varchar(100) NOT NULL,
  `first_payment` int(11) NOT NULL,
  `previous_diagnosis` text NOT NULL,
  `technical_diagnosis` text NOT NULL,
  `estimated_price` int(11) NOT NULL,
  `delivery_date` datetime NOT NULL,
  `made_by` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `history_quotes`
--

CREATE TABLE `history_quotes` (
  `id_quote` int(11) NOT NULL,
  `device` varchar(100) NOT NULL,
  `device_brand` varchar(100) NOT NULL,
  `device_color` varchar(50) NOT NULL,
  `device_type` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `contact_phone` int(11) NOT NULL,
  `first_payment` int(11) NOT NULL,
  `previous_diagnosis` text NOT NULL,
  `technical_diagnosis` text NOT NULL,
  `repairs` text NOT NULL,
  `repair_cost` text NOT NULL,
  `piece_cost` text NOT NULL,
  `final_price` int(11) NOT NULL,
  `is_paid` tinyint(1) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `delivery_date` datetime NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id_quote` int(11) NOT NULL,
  `device` varchar(100) NOT NULL,
  `device_brand` varchar(100) NOT NULL,
  `device_color` varchar(50) NOT NULL,
  `device_type` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `contact_phone` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `device_password` varchar(100) NOT NULL,
  `first_payment` int(11) NOT NULL,
  `previous_diagnosis` text NOT NULL,
  `technical_diagnosis` text NOT NULL,
  `repair_cost` int(11) NOT NULL,
  `piece_cost` int(11) NOT NULL,
  `final_price` int(11) NOT NULL,
  `remaining_money` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `delivery_date` datetime NOT NULL,
  `made_by` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `quote_repairs`
--

CREATE TABLE `quote_repairs` (
  `id_quote` int(11) NOT NULL,
  `id_repair` int(11) NOT NULL,
  `piece_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `repairs`
--

CREATE TABLE `repairs` (
  `id_repair` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `device` varchar(100) NOT NULL,
  `material` text NOT NULL,
  `tools` text NOT NULL,
  `description` text NOT NULL,
  `type_of_service` varchar(100) NOT NULL,
  `labor_costs` int(11) NOT NULL,
  `approximate_time` int(11) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrators`
--
ALTER TABLE `administrators`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `history_quotes`
--
ALTER TABLE `history_quotes`
  ADD PRIMARY KEY (`id_quote`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id_quote`),
  ADD KEY `Quotes-Users` (`made_by`);

--
-- Indexes for table `quote_repairs`
--
ALTER TABLE `quote_repairs`
  ADD KEY `Relation_Quote` (`id_quote`),
  ADD KEY `Relation_Repair` (`id_repair`);

--
-- Indexes for table `repairs`
--
ALTER TABLE `repairs`
  ADD PRIMARY KEY (`id_repair`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrators`
--
ALTER TABLE `administrators`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `history_quotes`
--
ALTER TABLE `history_quotes`
  MODIFY `id_quote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id_quote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `repairs`
--
ALTER TABLE `repairs`
  MODIFY `id_repair` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quotes`
--
ALTER TABLE `quotes`
  ADD CONSTRAINT `Quotes-Users` FOREIGN KEY (`made_by`) REFERENCES `administrators` (`id_admin`);

--
-- Constraints for table `quote_repairs`
--
ALTER TABLE `quote_repairs`
  ADD CONSTRAINT `Relation_Quote` FOREIGN KEY (`id_quote`) REFERENCES `quotes` (`id_quote`),
  ADD CONSTRAINT `Relation_Repair` FOREIGN KEY (`id_repair`) REFERENCES `repairs` (`Id_repair`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
