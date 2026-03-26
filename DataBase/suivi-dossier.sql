-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 26 mars 2026 à 14:56
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `suivi-dossier`
--

-- --------------------------------------------------------

--
-- Structure de la table `documents`
--

CREATE TABLE `documents` (
  `id_document` int(11) NOT NULL,
  `nom_document` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `documents`
--

INSERT INTO `documents` (`id_document`, `nom_document`) VALUES
(1, 'CIN'),
(2, 'Demande manuscrite'),
(3, 'Plan exploitation'),
(4, 'Devis équipement'),
(5, 'Attestation propriété'),
(6, 'Photo terrain');

-- --------------------------------------------------------

--
-- Structure de la table `dossiers`
--

CREATE TABLE `dossiers` (
  `id_dossier` int(11) NOT NULL,
  `CIN` varchar(20) NOT NULL,
  `id_service` int(11) NOT NULL,
  `date_depot` timestamp NOT NULL DEFAULT current_timestamp(),
  `statut` enum('En attente','En cours','Accepte','Refuse') DEFAULT 'En attente',
  `commentaire` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dossiers`
--

INSERT INTO `dossiers` (`id_dossier`, `CIN`, `id_service`, `date_depot`, `statut`, `commentaire`) VALUES
(25, 'reda', 1, '2026-03-18 11:14:56', 'En cours', 'acc'),
(26, 'asya', 2, '2026-03-18 11:47:50', 'En cours', ''),
(27, 'DA18801', 3, '2026-03-18 11:49:49', 'Refuse', 'الاوراق مكاملينش ايخصك شهادة الملكية'),
(29, 'fouzia', 1, '2026-03-24 21:47:44', 'Accepte', 'الوراق مكاملينش'),
(30, 'reda', 2, '2026-03-25 10:14:17', 'En attente', ''),
(31, 'reda', 1, '2026-03-25 10:17:33', 'En cours', ''),
(33, 'asya', 1, '2026-03-26 01:06:10', 'Accepte', 'rah chi wra9 jjhjhj'),
(34, 'reda', 1, '2026-03-26 10:19:56', 'Accepte', ''),
(35, 'mohamed', 1, '2026-03-26 10:32:27', 'Accepte', 'hjhjgjhgjhgjhfgf');

-- --------------------------------------------------------

--
-- Structure de la table `dossier_documents`
--

CREATE TABLE `dossier_documents` (
  `id` int(11) NOT NULL,
  `id_dossier` int(11) DEFAULT NULL,
  `id_document` int(11) DEFAULT NULL,
  `fichier` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `dossier_documents`
--

INSERT INTO `dossier_documents` (`id`, `id_dossier`, `id_document`, `fichier`) VALUES
(31, 25, 1, 'uploads/dossier_25/1774474937_69c456b98bbe5.png'),
(32, 25, 2, 'uploads/dossier_25/1774474984_69c456e8a4958.png'),
(33, 25, 3, 'uploads/dossier_25/1773832525_navigate.png'),
(34, 26, 1, 'uploads/dossier_26/1773834510_Capture d’écran 2025-06-23 211954.png'),
(35, 26, 4, 'uploads/dossier_26/1773834510_Capture d’écran 2025-10-27 224626.png'),
(36, 27, 1, 'uploads/dossier_27/1773834642_create_new_user.png'),
(37, 27, 5, 'uploads/dossier_27/1773834642_enhanced_image.jpg'),
(38, 29, 1, 'uploads/dossier_29/1774388889_OFPPT-Office-de-la-Formation-Professionnelle-et-de-la-Promotion-du-Travail.png'),
(39, 29, 2, 'uploads/dossier_29/1774388889_Capture d’écran 2026-03-02 115133.png'),
(40, 29, 3, 'uploads/dossier_29/1774388889_Sans titre.jpg'),
(41, 31, 1, 'uploads/dossier_31/1774433955_Capture d’écran 2026-03-01 194606.png'),
(42, 31, 2, 'uploads/dossier_31/1774433955_Capture d’écran 2026-03-01 194606.png'),
(43, 31, 3, 'uploads/dossier_31/1774433955_Capture d’écran 2026-02-28 113224.png'),
(47, 33, 1, 'uploads/dossier_33/1774487255_69c486d795165.png'),
(48, 33, 2, 'uploads/dossier_33/1774487212_WhatsApp Image 2026-01-20 at 1.18.47 AM.jpeg'),
(49, 33, 3, 'uploads/dossier_33/1774487212_hhhh.png'),
(50, 34, 1, 'uploads/dossier_34/1774520417_Capture d’écran 2026-03-02 115133.png'),
(51, 34, 2, 'uploads/dossier_34/1774520417_OFPPT-Office-de-la-Formation-Professionnelle-et-de-la-Promotion-du-Travail.png'),
(52, 34, 3, 'uploads/dossier_34/1774520417_bb73b699dba1fa9faf4d58ca2805af73.jpg'),
(53, 35, 1, 'uploads/dossier_35/1774521172_ASYA.jpg'),
(54, 35, 2, 'uploads/dossier_35/1774521219_69c50b83b949d.png'),
(55, 35, 3, 'uploads/dossier_35/1774521172_Capture d’écran 2025-01-19 211203.png');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `is_read`, `created_at`) VALUES
(1, NULL, '🔔 Votre dossier mise a jour', 0, '2026-03-26 10:06:20'),
(2, 'asya', '📂 Dossier en cours', 0, '2026-03-26 10:06:20'),
(3, NULL, '🔔 Votre dossier mise a jour', 0, '2026-03-26 10:07:06'),
(4, 'asya', '✅ Votre dossier à été accepter ', 0, '2026-03-26 10:07:06'),
(5, 'DA18801', '❌ Votre dossier est refuser', 0, '2026-03-26 10:07:53'),
(6, 'reda', '✅ Votre dossier à été accepter ', 0, '2026-03-26 10:20:53'),
(7, 'mohamed', '📂 Dossier en cours', 0, '2026-03-26 10:36:01'),
(8, 'mohamed', '⏳ Votre dossier est en attente', 0, '2026-03-26 10:36:48'),
(9, 'mohamed', '✅ Votre dossier à été accepter ', 0, '2026-03-26 10:39:36');

-- --------------------------------------------------------

--
-- Structure de la table `region`
--

CREATE TABLE `region` (
  `id` int(11) NOT NULL,
  `region` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `region`
--

INSERT INTO `region` (`id`, `region`) VALUES
(1, 'Tanger-Tétouan-Al Hoceïma'),
(2, 'l\'Oriental'),
(3, 'Fès-Meknès'),
(4, 'Rabat-Salé-Kénitra'),
(5, 'Béni Mellal-Khénifra'),
(6, 'Casablanca-Settat'),
(7, 'Marrakech-Safi'),
(8, 'Drâa-Tafilalet'),
(9, 'Souss-Massa'),
(10, 'Guelmim-Oued Noun'),
(11, 'Laâyoune-Sakia El Hamra'),
(12, 'Dakhla-Oued Ed Dahab');

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id_service` int(11) NOT NULL,
  `nom_service` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`id_service`, `nom_service`, `description`) VALUES
(1, 'Aides aux jeunes pour les investissements agricoles', NULL),
(2, 'Aménagements Hydro-agricoles', NULL),
(3, 'Pompage de l\'eau par énergie solaire', NULL),
(4, 'Amélioration génétique', NULL),
(5, 'Semences certifiées et plantations fruitières', NULL),
(6, 'Equipement des exploitations agricoles', NULL),
(7, 'Unités de valorisation', NULL),
(8, 'Promotion et diversification des exportations', NULL),
(9, 'Aides aux projets d’agrégation', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `service_documents`
--

CREATE TABLE `service_documents` (
  `id` int(11) NOT NULL,
  `id_service` int(11) DEFAULT NULL,
  `id_document` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `service_documents`
--

INSERT INTO `service_documents` (`id`, `id_service`, `id_document`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 2, 1),
(5, 2, 4),
(6, 3, 1),
(7, 3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `CIN` varchar(20) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `date_naissance` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `N_tel` varchar(50) NOT NULL,
  `date_inscription` datetime DEFAULT current_timestamp(),
  `PASSWORD` varchar(100) NOT NULL,
  `ROLE` varchar(50) DEFAULT 'user',
  `id_region` int(11) DEFAULT NULL,
  `id_ville` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`CIN`, `nom`, `prenom`, `date_naissance`, `email`, `N_tel`, `date_inscription`, `PASSWORD`, `ROLE`, `id_region`, `id_ville`) VALUES
('ahmed', 'rsghdgd', 'kxjxksjs', '2026-03-18', 'qlslsqkklslq@gmail.com', 'jshjsjjs', '2026-03-06 10:59:07', '$2y$10$N1pDt366nC43dWya5phJnOZsl8iGVrdszrp0XFjspe.sLM20jtl9W', 'admin', 1, 363),
('ARRRRRR', 'djjdjdjjdd', 'redaaaaaaaaaaa', '2026-03-27', 'kjkjxkjxkjx@gmail.com', '209209292', '2026-03-12 13:55:07', '$2y$10$Fi3otRdxIqoh7GmE6bGnle4BEGcdNuFhs0mABiYQZTrPR1vUcK6Pu', 'user', 3, 64),
('asya', 'tkjskjskj', 'kjksjks', '2026-03-20', 'jhfkhjhfjhfdfd@gmail.com', '287873873', '2026-03-16 11:52:19', '$2y$10$qDWx3pwqVZXV/9M1rO0Ef.e3TlTB68jCUpK7XVCYxSxLZhubq0tm2', 'user', 7, 52),
('C123456', 'Ahmed', 'Ali benou khaldoun', '2000-01-15', 'ahmed.ali@example.com', 'أأأأأأأأأأأأأأأأأأأأأأأأأأأ', '2026-03-09 11:29:24', 'password1', 'user', 1, 10),
('C123457', 'Sara', 'Elhaj', '1998-05-22', 'sara.elhaj@example.com', '0612345679', '2026-03-09 11:29:24', 'password2', 'user', 2, 11),
('C123458', 'Youssef', 'Khalil', '2001-03-10', 'youssef.khalil@example.com', '06000000', '2026-03-09 11:29:24', 'password3', 'user', 1, 12),
('C123459', 'Mouna', 'Hassan', '1999-07-30', 'mouna.hassan@example.com', '0612345681', '2026-03-09 11:29:24', 'password4', 'user', 3, 13),
('C123460', 'Rachid', 'Omar', '2002-11-12', 'rachid.omar@example.com', '0612345682', '2026-03-09 11:29:24', 'password5', 'user', 2, 14),
('C123461', 'Leila', 'Nabil', '2000-08-05', 'leila.nabil@example.com', '0612345683', '2026-03-09 11:29:24', 'password6', 'user', 1, 15),
('C123462', 'Hicham', 'Sami', '1997-12-17', 'hicham.sami@example.com', '0612345684', '2026-03-09 11:29:24', 'password7', 'user', 3, 16),
('C123463', 'Imane', 'Farid', '2001-09-09', 'imane.farid@example.com', '0612345685', '2026-03-09 11:29:24', 'password8', 'user', 2, 17),
('C123464', 'Omar', 'Yassir', '1998-04-25', 'omar.yassir@example.com', '0612345686', '2026-03-09 11:29:24', 'password9', 'user', 1, 18),
('C123466', 'Samir', 'Youssef', '1999-02-20', 'samir.youssef@example.com', '0612345688', '2026-03-09 12:32:35', 'password11', 'user', 2, 20),
('C123467', 'Nadia', 'Lamia', '2000-12-01', 'nadia.lamia@example.com', '0612345689', '2026-03-09 12:32:35', 'password12', 'user', 1, 21),
('C123468', 'Karim', 'Bilal', '2001-07-18', 'karim.bilal@example.com', '0612345690', '2026-03-09 12:32:35', 'password13', 'user', 3, 22),
('C123469', 'Salma', 'Rania', '1998-09-05', 'salma.rania@example.com', '0612345691', '2026-03-09 12:32:35', 'password14', 'user', 2, 23),
('C123470', 'Adil', 'Hussein', '2002-03-28', 'adil.hussein@example.com', '0612345692', '2026-03-09 12:32:35', 'password15', 'user', 1, 24),
('C123471', 'Siham', 'Malak', '1997-11-11', 'siham.malak@example.com', '0612345693', '2026-03-09 12:32:35', 'password16', 'user', 3, 25),
('C123472', 'Yassine', 'Nour', '2000-05-15', 'yassine.nour@example.com', '0612345694', '2026-03-09 12:32:35', 'password17', 'user', 2, 26),
('C123473', 'Leila', 'Sara', '1999-08-22', 'leila.sara@example.com', '0612345695', '2026-03-09 12:32:35', 'password18', 'user', 1, 27),
('C123474', 'Omar', 'Rami', '2001-01-09', 'omar.rami@example.com', '0612345696', '2026-03-09 12:32:35', 'password19', 'user', 3, 28),
('C123475', 'Fatima', 'Imane', '2000-06-30', 'fatima.imane@example.com', '0612345697', '2026-03-09 12:32:35', 'password20', 'user', 2, 29),
('DA18801', 'Boulasdak', 'Said', '2026-03-11', 'said.blsk@gmaol.com', '0675401904', '2026-03-17 11:56:46', '$2y$10$VeDV.U.J9hourDDteun8xesOE1.sfVK3fpvBcAUkEJqTKUpfTCmM6', 'user', 9, 275),
('fouzia', 'jdjdjd', 'ndndnndd', '2026-03-12', 'djhdjhdjhd@gmail.com', 'jdhjdhjd', '2026-03-24 22:47:22', '$2y$10$311giiqhyYBbeOyFD3NGLeJmLpFBwT04bdse6ya1tuImXZgj9VwsW', 'user', 3, 159),
('jdjdjjd', 'sksksks', 'skdkkdd', '2026-03-13', 'kejkejkejeje@gmail.com', '7377373', '2026-03-24 12:34:27', '$2y$10$YYkJnFBrh.1fcSBAE5huP.22eytXMxYiN59sLEPL/sv0VsyHF8cTe', 'user', 8, 179),
('mohamed', 'kdjkdjd', 'lsklks', '2026-03-12', 'skksjksjks@gmail.com', '82782782', '2026-03-26 11:31:25', '$2y$10$iiZ9M4qbrMifjyBEC6QBZeMRy2.mWFNfG5ICqGV8GiWlv/p5jM77C', 'user', 3, 159),
('reda', 'ahmed', 'bertali', '2026-03-27', 'hahhaagstts@gmail.com', '11111111', '2026-03-09 14:02:10', '$2y$10$JDLT.1zqXxH1qF.8kDV1m.HlPIQOQNUFXwJHkhMIuL35gKAFGxp.m', 'user', 9, 275),
('role', 'Boulasdak', 'Ahmed Rida', '2005-12-18', 'ahmedridaboulasdak@gmail.com', '111111', '2026-03-04 15:17:26', '$2y$10$Zfmg.Plmmc0OdR2hO8zRWe3SwksQ1U.dl4/UjJQ/WxvZoD8ZEfpQC', 'admin', 3, 159);

-- --------------------------------------------------------

--
-- Structure de la table `ville`
--

CREATE TABLE `ville` (
  `id` int(11) NOT NULL,
  `ville` varchar(40) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `region` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `ville`
--

INSERT INTO `ville` (`id`, `ville`, `region`) VALUES
(1, 'Aïn Harrouda', 6),
(2, 'Ben Yakhlef', 6),
(3, 'Bouskoura', 6),
(4, 'Casablanca', 6),
(5, 'Médiouna', 6),
(6, 'Mohammadia', 6),
(7, 'Tit Mellil', 6),
(8, 'Ben Yakhlef', 6),
(9, 'Bejaâd', 5),
(10, 'Ben Ahmed', 6),
(11, 'Benslimane', 6),
(12, 'Berrechid', 6),
(13, 'Boujniba', 5),
(14, 'Boulanouare', 5),
(15, 'Bouznika', 6),
(16, 'Deroua', 6),
(17, 'El Borouj', 6),
(18, 'El Gara', 6),
(19, 'Guisser', 6),
(20, 'Hattane', 5),
(21, 'Khouribga', 5),
(22, 'Loulad', 6),
(23, 'Oued Zem', 5),
(24, 'Oulad Abbou', 6),
(25, 'Oulad H\'Riz Sahel', 6),
(26, 'Oulad M\'rah', 6),
(27, 'Oulad Saïd', 6),
(28, 'Oulad Sidi Ben Daoud', 6),
(29, 'Ras El Aïn', 6),
(30, 'Settat', 6),
(31, 'Sidi Rahhal Chataï', 6),
(32, 'Soualem', 6),
(33, 'Azemmour', 6),
(34, 'Bir Jdid', 6),
(35, 'Bouguedra', 7),
(36, 'Echemmaia', 7),
(37, 'El Jadida', 6),
(38, 'Hrara', 7),
(39, 'Ighoud', 7),
(40, 'Jamâat Shaim', 7),
(41, 'Jorf Lasfar', 6),
(42, 'Khemis Zemamra', 6),
(43, 'Laaounate', 6),
(44, 'Moulay Abdallah', 6),
(45, 'Oualidia', 6),
(46, 'Oulad Amrane', 6),
(47, 'Oulad Frej', 6),
(48, 'Oulad Ghadbane', 6),
(49, 'Safi', 7),
(50, 'Sebt El Maârif', 6),
(51, 'Sebt Gzoula', 7),
(52, 'Sidi Ahmed', 7),
(53, 'Sidi Ali Ban Hamdouche', 6),
(54, 'Sidi Bennour', 6),
(55, 'Sidi Bouzid', 6),
(56, 'Sidi Smaïl', 6),
(57, 'Youssoufia', 7),
(58, 'Fès', 3),
(59, 'Aïn Cheggag', 3),
(60, 'Bhalil', 3),
(61, 'Boulemane', 3),
(62, 'El Menzel', 3),
(63, 'Guigou', 3),
(64, 'Imouzzer Kandar', 3),
(65, 'Imouzzer Marmoucha', 3),
(66, 'Missour', 3),
(67, 'Moulay Yaâcoub', 3),
(68, 'Ouled Tayeb', 3),
(69, 'Outat El Haj', 3),
(70, 'Ribate El Kheir', 3),
(71, 'Séfrou', 3),
(72, 'Skhinate', 3),
(73, 'Tafajight', 3),
(74, 'Arbaoua', 4),
(75, 'Aïn Dorij', 1),
(76, 'Dar Gueddari', 4),
(77, 'Had Kourt', 4),
(78, 'Jorf El Melha', 4),
(79, 'Kénitra', 4),
(80, 'Khenichet', 4),
(81, 'Lalla Mimouna', 4),
(82, 'Mechra Bel Ksiri', 4),
(83, 'Mehdia', 4),
(84, 'Moulay Bousselham', 4),
(85, 'Sidi Allal Tazi', 4),
(86, 'Sidi Kacem', 4),
(87, 'Sidi Slimane', 4),
(88, 'Sidi Taibi', 4),
(89, 'Sidi Yahya El Gharb', 4),
(90, 'Souk El Arbaa', 4),
(91, 'Akka', 9),
(92, 'Assa', 10),
(93, 'Bouizakarne', 10),
(94, 'El Ouatia', 10),
(95, 'Es-Semara', 11),
(96, 'Fam El Hisn', 9),
(97, 'Foum Zguid', 9),
(98, 'Guelmim', 10),
(99, 'Taghjijt', 10),
(100, 'Tan-Tan', 10),
(101, 'Tata', 9),
(102, 'Zag', 10),
(103, 'Marrakech', 7),
(104, 'Ait Daoud', 7),
(115, 'Amizmiz', 7),
(116, 'Assahrij', 7),
(117, 'Aït Ourir', 7),
(118, 'Ben Guerir', 7),
(119, 'Chichaoua', 7),
(120, 'El Hanchane', 7),
(121, 'El Kelaâ des Sraghna', 7),
(122, 'Essaouira', 7),
(123, 'Fraïta', 7),
(124, 'Ghmate', 7),
(125, 'Ighounane', 8),
(126, 'Imintanoute', 7),
(127, 'Kattara', 7),
(128, 'Lalla Takerkoust', 7),
(129, 'Loudaya', 7),
(130, 'Lâattaouia', 7),
(131, 'Moulay Brahim', 7),
(132, 'Mzouda', 7),
(133, 'Ounagha', 7),
(134, 'Sid L\'Mokhtar', 7),
(135, 'Sid Zouin', 7),
(136, 'Sidi Abdallah Ghiat', 7),
(137, 'Sidi Bou Othmane', 7),
(138, 'Sidi Rahhal', 7),
(139, 'Skhour Rehamna', 7),
(140, 'Smimou', 7),
(141, 'Tafetachte', 7),
(142, 'Tahannaout', 7),
(143, 'Talmest', 7),
(144, 'Tamallalt', 7),
(145, 'Tamanar', 7),
(146, 'Tamansourt', 7),
(147, 'Tameslouht', 7),
(148, 'Tanalt', 9),
(149, 'Zeubelemok', 7),
(150, 'Meknès‎', 3),
(151, 'Khénifra', 5),
(152, 'Agourai', 3),
(153, 'Ain Taoujdate', 3),
(154, 'MyAliCherif', 8),
(155, 'Rissani', 8),
(156, 'Amalou Ighriben', 5),
(157, 'Aoufous', 8),
(158, 'Arfoud', 8),
(159, 'Azrou', 3),
(160, 'Aïn Jemaa', 3),
(161, 'Aïn Karma', 3),
(162, 'Aïn Leuh', 3),
(163, 'Aït Boubidmane', 3),
(164, 'Aït Ishaq', 5),
(165, 'Boudnib', 8),
(166, 'Boufakrane', 3),
(167, 'Boumia', 8),
(168, 'El Hajeb', 3),
(169, 'Elkbab', 5),
(170, 'Er-Rich', 5),
(171, 'Errachidia', 8),
(172, 'Gardmit', 8),
(173, 'Goulmima', 8),
(174, 'Gourrama', 8),
(175, 'Had Bouhssoussen', 5),
(176, 'Haj Kaddour', 3),
(177, 'Ifrane', 3),
(178, 'Itzer', 8),
(179, 'Jorf', 8),
(180, 'Kehf Nsour', 5),
(181, 'Kerrouchen', 5),
(182, 'M\'haya', 3),
(183, 'M\'rirt', 5),
(184, 'Midelt', 8),
(185, 'Moulay Ali Cherif', 8),
(186, 'Moulay Bouazza', 5),
(187, 'Moulay Idriss Zerhoun', 3),
(188, 'Moussaoua', 3),
(189, 'N\'Zalat Bni Amar', 3),
(190, 'Ouaoumana', 5),
(191, 'Oued Ifrane', 3),
(192, 'Sabaa Aiyoun', 3),
(193, 'Sebt Jahjouh', 3),
(194, 'Sidi Addi', 3),
(195, 'Tichoute', 8),
(196, 'Tighassaline', 5),
(197, 'Tighza', 5),
(198, 'Timahdite', 3),
(199, 'Tinejdad', 8),
(200, 'Tizguite', 3),
(201, 'Toulal', 3),
(202, 'Tounfite', 8),
(203, 'Zaouia d\'Ifrane', 3),
(204, 'Zaïda', 8),
(205, 'Ahfir', 2),
(206, 'Aklim', 2),
(207, 'Al Aroui', 2),
(208, 'Aïn Bni Mathar', 2),
(209, 'Aïn Erreggada', 2),
(210, 'Ben Taïeb', 2),
(211, 'Berkane', 2),
(212, 'Bni Ansar', 2),
(213, 'Bni Chiker', 2),
(214, 'Bni Drar', 2),
(215, 'Bni Tadjite', 2),
(216, 'Bouanane', 2),
(217, 'Bouarfa', 2),
(218, 'Bouhdila', 2),
(219, 'Dar El Kebdani', 2),
(220, 'Debdou', 2),
(221, 'Douar Kannine', 2),
(222, 'Driouch', 2),
(223, 'El Aïoun Sidi Mellouk', 2),
(224, 'Farkhana', 2),
(225, 'Figuig', 2),
(226, 'Ihddaden', 2),
(227, 'Jaâdar', 2),
(228, 'Jerada', 2),
(229, 'Kariat Arekmane', 2),
(230, 'Kassita', 2),
(231, 'Kerouna', 2),
(232, 'Laâtamna', 2),
(233, 'Madagh', 2),
(234, 'Midar', 2),
(235, 'Nador', 2),
(236, 'Naima', 2),
(237, 'Oued Heimer', 2),
(238, 'Oujda', 2),
(239, 'Ras El Ma', 2),
(240, 'Saïdia', 2),
(241, 'Selouane', 2),
(242, 'Sidi Boubker', 2),
(243, 'Sidi Slimane Echcharaa', 2),
(244, 'Talsint', 2),
(245, 'Taourirt', 2),
(246, 'Tendrara', 2),
(247, 'Tiztoutine', 2),
(248, 'Touima', 2),
(249, 'Touissit', 2),
(250, 'Zaïo', 2),
(251, 'Zeghanghane', 2),
(252, 'Rabat', 4),
(253, 'Salé', 4),
(254, 'Ain El Aouda', 4),
(255, 'Harhoura', 4),
(256, 'Khémisset', 4),
(257, 'Oulmès', 4),
(258, 'Rommani', 4),
(259, 'Sidi Allal El Bahraoui', 4),
(260, 'Sidi Bouknadel', 4),
(261, 'Skhirate', 4),
(262, 'Tamesna', 4),
(263, 'Témara', 4),
(264, 'Tiddas', 4),
(265, 'Tiflet', 4),
(266, 'Touarga', 4),
(267, 'Agadir', 9),
(268, 'Agdz', 8),
(269, 'Agni Izimmer', 9),
(270, 'Aït Melloul', 9),
(271, 'Alnif', 8),
(272, 'Anzi', 9),
(273, 'Aoulouz', 9),
(274, 'Aourir', 9),
(275, 'Arazane', 9),
(276, 'Aït Baha', 9),
(277, 'Aït Iaâza', 9),
(278, 'Aït Yalla', 8),
(279, 'Ben Sergao', 9),
(280, 'Biougra', 9),
(281, 'Boumalne-Dadès', 8),
(282, 'Dcheira El Jihadia', 9),
(283, 'Drargua', 9),
(284, 'El Guerdane', 9),
(285, 'Harte Lyamine', 8),
(286, 'Ida Ougnidif', 9),
(287, 'Ifri', 8),
(288, 'Igdamen', 9),
(289, 'Ighil n\'Oumgoun', 8),
(290, 'Imassine', 8),
(291, 'Inezgane', 9),
(292, 'Irherm', 9),
(293, 'Kelaat-M\'Gouna', 8),
(294, 'Lakhsas', 9),
(295, 'Lakhsass', 9),
(296, 'Lqliâa', 9),
(297, 'M\'semrir', 8),
(298, 'Massa (Maroc)', 9),
(299, 'Megousse', 9),
(300, 'Ouarzazate', 8),
(301, 'Oulad Berhil', 9),
(302, 'Oulad Teïma', 9),
(303, 'Sarghine', 8),
(304, 'Sidi Ifni', 10),
(305, 'Skoura', 8),
(306, 'Tabounte', 8),
(307, 'Tafraout', 9),
(308, 'Taghzout', 1),
(309, 'Tagzen', 9),
(310, 'Taliouine', 9),
(311, 'Tamegroute', 8),
(312, 'Tamraght', 9),
(313, 'Tanoumrite Nkob Zagora', 8),
(314, 'Taourirt ait zaghar', 8),
(315, 'Taroudannt', 9),
(316, 'Temsia', 9),
(317, 'Tifnit', 9),
(318, 'Tisgdal', 9),
(319, 'Tiznit', 9),
(320, 'Toundoute', 8),
(321, 'Zagora', 8),
(322, 'Afourar', 5),
(323, 'Aghbala', 5),
(324, 'Azilal', 5),
(325, 'Aït Majden', 5),
(326, 'Beni Ayat', 5),
(327, 'Béni Mellal', 5),
(328, 'Bin elouidane', 5),
(329, 'Bradia', 5),
(330, 'Bzou', 5),
(331, 'Dar Oulad Zidouh', 5),
(332, 'Demnate', 5),
(333, 'Dra\'a', 8),
(334, 'El Ksiba', 5),
(335, 'Foum Jamaa', 5),
(336, 'Fquih Ben Salah', 5),
(337, 'Kasba Tadla', 5),
(338, 'Ouaouizeght', 5),
(339, 'Oulad Ayad', 5),
(340, 'Oulad M\'Barek', 5),
(341, 'Oulad Yaich', 5),
(342, 'Sidi Jaber', 5),
(343, 'Souk Sebt Oulad Nemma', 5),
(344, 'Zaouïat Cheikh', 5),
(345, 'Tanger‎', 1),
(346, 'Tétouan‎', 1),
(347, 'Akchour', 1),
(348, 'Assilah', 1),
(349, 'Bab Berred', 1),
(350, 'Bab Taza', 1),
(351, 'Brikcha', 1),
(352, 'Chefchaouen', 1),
(353, 'Dar Bni Karrich', 1),
(354, 'Dar Chaoui', 1),
(355, 'Fnideq', 1),
(356, 'Gueznaia', 1),
(357, 'Jebha', 1),
(358, 'Karia', 3),
(359, 'Khémis Sahel', 1),
(360, 'Ksar El Kébir', 1),
(361, 'Larache', 1),
(362, 'M\'diq', 1),
(363, 'Martil', 1),
(364, 'Moqrisset', 1),
(365, 'Oued Laou', 1),
(366, 'Oued Rmel', 1),
(367, 'Ouazzane', 1),
(368, 'Point Cires', 1),
(369, 'Sidi Lyamani', 1),
(370, 'Sidi Mohamed ben Abdallah el-Raisuni', 1),
(371, 'Zinat', 1),
(372, 'Ajdir‎', 1),
(373, 'Aknoul‎', 3),
(374, 'Al Hoceïma‎', 1),
(375, 'Aït Hichem‎', 1),
(376, 'Bni Bouayach‎', 1),
(377, 'Bni Hadifa‎', 1),
(378, 'Ghafsai‎', 3),
(379, 'Guercif‎', 2),
(380, 'Imzouren‎', 1),
(381, 'Inahnahen‎', 1),
(382, 'Issaguen (Ketama)‎', 1),
(383, 'Karia (El Jadida)‎', 6),
(384, 'Karia Ba Mohamed‎', 3),
(385, 'Oued Amlil‎', 3),
(386, 'Oulad Zbair‎', 3),
(387, 'Tahla‎', 3),
(388, 'Tala Tazegwaght‎', 1),
(389, 'Tamassint‎', 1),
(390, 'Taounate‎', 3),
(391, 'Targuist‎', 1),
(392, 'Taza‎', 3),
(393, 'Taïnaste‎', 3),
(394, 'Thar Es-Souk‎', 3),
(395, 'Tissa‎', 3),
(396, 'Tizi Ouasli‎', 3),
(397, 'Laayoune‎', 11),
(398, 'El Marsa‎', 11),
(399, 'Tarfaya‎', 11),
(400, 'Boujdour‎', 11),
(401, 'Awsard', 12),
(402, 'Oued-Eddahab', 12),
(403, 'Stehat', 1),
(404, 'Aït Attab', 5);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id_document`);

--
-- Index pour la table `dossiers`
--
ALTER TABLE `dossiers`
  ADD PRIMARY KEY (`id_dossier`),
  ADD KEY `CIN` (`CIN`),
  ADD KEY `id_service` (`id_service`);

--
-- Index pour la table `dossier_documents`
--
ALTER TABLE `dossier_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_dossier` (`id_dossier`),
  ADD KEY `id_document` (`id_document`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_service`);

--
-- Index pour la table `service_documents`
--
ALTER TABLE `service_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_service` (`id_service`),
  ADD KEY `id_document` (`id_document`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`CIN`),
  ADD KEY `fk_user_region` (`id_region`),
  ADD KEY `fk_user_ville` (`id_ville`);

--
-- Index pour la table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`id`),
  ADD KEY `region` (`region`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `documents`
--
ALTER TABLE `documents`
  MODIFY `id_document` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `dossiers`
--
ALTER TABLE `dossiers`
  MODIFY `id_dossier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `dossier_documents`
--
ALTER TABLE `dossier_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `region`
--
ALTER TABLE `region`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `service_documents`
--
ALTER TABLE `service_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `ville`
--
ALTER TABLE `ville`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=405;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `dossiers`
--
ALTER TABLE `dossiers`
  ADD CONSTRAINT `dossiers_ibfk_1` FOREIGN KEY (`CIN`) REFERENCES `user` (`CIN`),
  ADD CONSTRAINT `dossiers_ibfk_2` FOREIGN KEY (`id_service`) REFERENCES `services` (`id_service`);

--
-- Contraintes pour la table `dossier_documents`
--
ALTER TABLE `dossier_documents`
  ADD CONSTRAINT `dossier_documents_ibfk_1` FOREIGN KEY (`id_dossier`) REFERENCES `dossiers` (`id_dossier`),
  ADD CONSTRAINT `dossier_documents_ibfk_2` FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`);

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`CIN`);

--
-- Contraintes pour la table `service_documents`
--
ALTER TABLE `service_documents`
  ADD CONSTRAINT `service_documents_ibfk_1` FOREIGN KEY (`id_service`) REFERENCES `services` (`id_service`),
  ADD CONSTRAINT `service_documents_ibfk_2` FOREIGN KEY (`id_document`) REFERENCES `documents` (`id_document`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_region` FOREIGN KEY (`id_region`) REFERENCES `region` (`id`),
  ADD CONSTRAINT `fk_user_ville` FOREIGN KEY (`id_ville`) REFERENCES `ville` (`id`);

--
-- Contraintes pour la table `ville`
--
ALTER TABLE `ville`
  ADD CONSTRAINT `ville_ibfk_1` FOREIGN KEY (`region`) REFERENCES `region` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
