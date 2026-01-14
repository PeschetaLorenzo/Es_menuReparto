-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 13, 2026 alle 17:04
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `es_ristorante`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `ordini`
--

CREATE TABLE `ordini` (
  `nOrd` int(11) NOT NULL,
  `nTav` varchar(5) NOT NULL,
  `Pane` tinyint(1) NOT NULL,
  `Salsiccia` tinyint(1) NOT NULL,
  `Cipolle` tinyint(1) NOT NULL,
  `Crauti` tinyint(1) NOT NULL,
  `Patatine` tinyint(1) NOT NULL,
  `Insalata` tinyint(1) NOT NULL,
  `Vegetariano` tinyint(1) NOT NULL,
  `Completato` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `ordini`
--
/*
INSERT INTO `ordini` (`nOrd`, `nTav`, `Pane`, `Salsiccia`, `Cipolle`, `Crauti`, `Patatine`, `Insalata`, `Vegetariano`, `Completato`) VALUES
(10, 't2', 1, 1, 1, 1, 1, 0, 0, 1),
(11, 't2', 1, 1, 1, 1, 1, 0, 0, 1),
(12, 't2', 1, 1, 0, 1, 1, 0, 0, 1),
(13, 't2', 1, 1, 0, 0, 0, 1, 1, 0),
(14, 't2', 0, 0, 0, 0, 1, 0, 0, 0),
(15, 't2', 1, 1, 0, 1, 1, 0, 0, 0);
*/
--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `ordini`
--
ALTER TABLE `ordini`
  ADD PRIMARY KEY (`nOrd`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `ordini`
--
ALTER TABLE `ordini`
  MODIFY `nOrd` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
