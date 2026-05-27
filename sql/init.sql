-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2026 at 01:44 AM
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
-- AUTO_INCREMENT for table `repairs`
--
ALTER TABLE `repairs`
  MODIFY `id_repair` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
