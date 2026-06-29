-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2026 at 07:24 AM
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
(1, 'Araceli', 'Martinez Campos', '4491231234', 'Admin', 'ara123', '2026-05-15 08:03:11', 0),
(2, 'Carlos', 'Macias', '4499871234', 'Admin', 'carlos123', '2026-05-16 10:27:42', 0),
(3, 'Gabriel', 'Lopez del Campo', '8894321234', 'Gerente', '123', '2026-05-17 12:23:04', 0),
(4, 'Juan', 'Gomez Lopez', '8891234567', 'Empleado', 'juan', '2026-05-22 10:17:26', 0);

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

--
-- Dumping data for table `diagnostics`
--

INSERT INTO `diagnostics` (`device`, `device_brand`, `device_color`, `device_type`, `customer_name`, `contact_phone`, `email`, `device_password`, `first_payment`, `previous_diagnosis`, `technical_diagnosis`, `estimated_price`, `delivery_date`, `made_by`) VALUES
('Iphone 16 pro', 'Apple', 'Rosa', '', 'Pato', 0, '', '', 0, 'Dura muy poco la bateria', '', 0, '2026-06-08 02:30:00', '3');

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

--
-- Dumping data for table `history_quotes`
--

INSERT INTO `history_quotes` (`id_quote`, `device`, `device_brand`, `device_color`, `device_type`, `customer_name`, `contact_phone`, `first_payment`, `previous_diagnosis`, `technical_diagnosis`, `repairs`, `repair_cost`, `piece_cost`, `final_price`, `is_paid`, `payment_method`, `status`, `delivery_date`, `is_deleted`) VALUES
(1, 'Iphone 15 pro max', 'Iphone', 'Rosa', 'Celular', 'Maria', 2147483647, 200, 'El telefono no carga', 'El modulo de carga esta dañado', 'Cambio de puerto de carga, Limpieza profunda', '150', '900', 1050, 1, 'Tarjeta de debito', 'completado', '2026-06-21 01:46:00', 0);

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

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id_quote`, `device`, `device_brand`, `device_color`, `device_type`, `customer_name`, `contact_phone`, `device_password`, `first_payment`, `previous_diagnosis`, `technical_diagnosis`, `repair_cost`, `piece_cost`, `final_price`, `remaining_money`, `payment_method`, `status`, `delivery_date`, `made_by`, `is_deleted`) VALUES
(1, 'Iphone 15 pro max', 'Iphone', 'Rosa', 'Celular', 'Maria', 2147483647, '', 200, 'El telefono no carga', 'El modulo de carga esta dañado', 150, 900, 1050, 850, '', 'pendiente', '2026-06-08 09:02:00', 3, 0),
(4, 'Oppo Reno 14f', 'OPPO', 'Azul Cian', 'Celular', 'Olivia', 2147483647, '', 0, '', 'Cambio completo del modulo de carga', 200, 400, 600, 600, '', 'pendiente', '2026-06-08 11:52:00', 3, 0),
(5, 'Iphone 17 pro', 'Iphone', 'Rosa', 'Celular', 'Santana', 2147483647, '', 500, 'El telefono no enciende', 'El modulo de carga esta dañado y la pantalla contiene una fisura', 350, 1400, 1750, 1250, '', 'pendiente', '2026-06-16 06:38:00', 1, 0),
(6, 'Fold 4', 'Samsung', 'Azul', 'Celular', 'Mariano', 2147483647, '', 0, '', 'Pantalla rota', 250, 820, 1070, 770, '', 'pendiente', '2026-06-14 08:51:00', 3, 0),
(7, 'Flip 5', 'Samsung', 'Verde', 'Celular', 'Josue', 2147483647, '123456', 100, 'Limpiar el puerto de carga', 'El puerto de carga esta dañado, fue necesario cambiarlo', 200, 150, 350, 250, '', 'pendiente', '2026-06-14 20:42:00', 3, 0),
(8, 'Iphone 14 mini', 'Apple', 'Blanco', 'Celular', 'Pablito', 2147483647, '123', 100, 'La pantalla no enciende', 'Cambio de modulo de pantalla - $1000\nLimpieza - $100', 250, 1100, 1350, 1250, '', 'pendiente', '2026-06-28 18:11:00', 3, 0),
(9, 'ASUS TUF 16', 'ASUS', 'Negro', 'Laptop', 'Angelito', 1234567, '', 0, 'No enciende', 'Cambio de puerto de carga - $1500', 200, 1500, 1700, 1700, '', 'pendiente', '2026-06-28 18:13:00', 3, 0),
(10, 'Macbook 13', 'Apple', 'Verde', 'Laptop', 'Arturo', 2147483647, 'Gaby', 1000, 'Pantalla estrellada', 'Cambio total de pantalla - $3000', 150, 3000, 3150, 2150, '', 'pendiente', '2026-06-28 18:17:00', 3, 0),
(11, 'Tab s6 lite', 'Samsung', 'Negro', 'Tablet', 'Gaby', 2147483647, '', 0, 'No carga', 'Cambio de puerto de carga - $300', 200, 300, 500, 500, '', 'pendiente', '2026-06-28 18:20:00', 3, 0),
(12, 'Tab S9 plus', 'Samsung', 'Blanco', 'Tablet', 'Mark', 2147483647, '', 1000, 'No enciende', 'Cambio de pantalla - $2000', 150, 2000, 2150, 1150, '', 'pendiente', '2026-06-28 18:46:00', 3, 0),
(13, 'S25 Ultra', 'Samsung', 'Negro', 'Celular', 'Abdul', 2147483647, '3456', 0, 'No enciende la pantalla', 'Cambio de pantalla - $1000', 150, 1000, 1150, 1150, '', 'pendiente', '2026-06-28 18:53:00', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quote_repairs`
--

CREATE TABLE `quote_repairs` (
  `id_quote` int(11) NOT NULL,
  `id_repair` int(11) NOT NULL,
  `piece_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quote_repairs`
--

INSERT INTO `quote_repairs` (`id_quote`, `id_repair`, `piece_cost`) VALUES
(1, 3, 800),
(1, 2, 200),
(5, 1, 800),
(5, 3, 600),
(6, 1, 800),
(6, 2, 20),
(7, 3, 150),
(8, 1, 1000),
(8, 2, 100),
(9, 3, 1500),
(10, 1, 3000),
(11, 3, 300),
(12, 1, 2000),
(13, 1, 1000);

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
-- Dumping data for table `repairs`
--

INSERT INTO `repairs` (`id_repair`, `name`, `device`, `material`, `tools`, `description`, `type_of_service`, `labor_costs`, `approximate_time`, `is_deleted`) VALUES
(1, 'Cambio de pantalla', 'Celular', 'Liquido para lentes', 'Destornillador', '', 'Reparacion', 150, 4, 0),
(2, 'Limpieza profunda', 'Tablet', 'Liquido para lentes', 'Trapo', '', 'Mantenimiento', 100, 1, 0),
(3, 'Cambio de puerto de carga', 'Tablet', 'Liquido para lentes', 'Destornillador, tarjeta', '', 'Reparacion', 200, 5, 0);

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
  MODIFY `id_quote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id_quote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `repairs`
--
ALTER TABLE `repairs`
  MODIFY `id_repair` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
