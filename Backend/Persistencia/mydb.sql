-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06/12/2023 às 23:41
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
-- Banco de dados: `mydb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `hospede`
--

CREATE TABLE `hospede` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoafisica`
--

CREATE TABLE `pessoafisica` (
  `cpf` int(11) DEFAULT NULL,
  `rg` varchar(45) DEFAULT NULL,
  `hospede_codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoajuridica`
--

CREATE TABLE `pessoajuridica` (
  `cnpj` int(11) DEFAULT NULL,
  `hospede_codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `telefone`
--

CREATE TABLE `telefone` (
  `codigo` int(11) NOT NULL,
  `ddd` varchar(5) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `codHospede` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD PRIMARY KEY (`hospede_codigo`);

--
-- Índices de tabela `pessoajuridica`
--
ALTER TABLE `pessoajuridica`
  ADD PRIMARY KEY (`hospede_codigo`);

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
-- AUTO_INCREMENT de tabela `telefone`
--
ALTER TABLE `telefone`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `pessoafisica`
--
ALTER TABLE `pessoafisica`
  ADD CONSTRAINT `fk_pessoaFisica_hospede` FOREIGN KEY (`hospede_codigo`) REFERENCES `hospede` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `pessoajuridica`
--
ALTER TABLE `pessoajuridica`
  ADD CONSTRAINT `fk_pessoaJuridica_hospede1` FOREIGN KEY (`hospede_codigo`) REFERENCES `hospede` (`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Restrições para tabelas `telefone`
--
ALTER TABLE `telefone`
  ADD CONSTRAINT `telefone_ibfk_1` FOREIGN KEY (`codHospede`) REFERENCES `hospede` (`codigo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
