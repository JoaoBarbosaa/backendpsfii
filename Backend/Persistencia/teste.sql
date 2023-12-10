-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 09/12/2023 às 20:22
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `teste`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `hospede`
--

CREATE TABLE `hospede` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `hospede`
--

INSERT INTO `hospede` (`codigo`, `nome`, `endereco`, `email`) VALUES
(1, 'Maria Clara 23', 'maria@gmail.com', 'Rua das Flores'),
(3, 'Rosa Flores', 'Rua das Sol', 'sosagmail.com'),
(4, 'Manzine 22', 'Rua 15', 'Manzine@gmail.com');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoafisica`
--

CREATE TABLE `pessoafisica` (
  `cpfUsuario` varchar(11) NOT NULL,
  `rgUsuario` varchar(20) DEFAULT NULL,
  `codHospede` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoafisica`
--

INSERT INTO `pessoafisica` (`cpfUsuario`, `rgUsuario`, `codHospede`) VALUES
('36985214741', '13645978', 1),
('3152856465', '3153265', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoajuridica`
--

CREATE TABLE `pessoajuridica` (
  `cnpjUsuario` varchar(14) NOT NULL,
  `codHospede` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoajuridica`
--

INSERT INTO `pessoajuridica` (`cnpjUsuario`, `codHospede`) VALUES
('96325874125898', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `telefone`
--

CREATE TABLE `telefone` (
  `codigo` int(11) NOT NULL,
  `ddd` varchar(3) DEFAULT NULL,
  `numero` varchar(15) DEFAULT NULL,
  `codHospede` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `telefone`
--

INSERT INTO `telefone` (`codigo`, `ddd`, `numero`, `codHospede`) VALUES
(1, '11', '9985698511', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `hospede`
--
ALTER TABLE `hospede`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `pessoafisica`
--
ALTER TABLE `pessoafisica`
  ADD KEY `codHospede` (`codHospede`);

--
-- Índices de tabela `pessoajuridica`
--
ALTER TABLE `pessoajuridica`
  ADD KEY `codHospede` (`codHospede`);

--
-- Índices de tabela `telefone`
--
ALTER TABLE `telefone`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codHospede` (`codHospede`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `hospede`
--
ALTER TABLE `hospede`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `telefone`
--
ALTER TABLE `telefone`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `pessoafisica`
--
ALTER TABLE `pessoafisica`
  ADD CONSTRAINT `pessoafisica_ibfk_1` FOREIGN KEY (`codHospede`) REFERENCES `hospede` (`codigo`);

--
-- Restrições para tabelas `pessoajuridica`
--
ALTER TABLE `pessoajuridica`
  ADD CONSTRAINT `pessoajuridica_ibfk_1` FOREIGN KEY (`codHospede`) REFERENCES `hospede` (`codigo`);

--
-- Restrições para tabelas `telefone`
--
ALTER TABLE `telefone`
  ADD CONSTRAINT `telefone_ibfk_1` FOREIGN KEY (`codHospede`) REFERENCES `hospede` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
