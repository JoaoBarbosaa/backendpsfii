-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/10/2023 às 02:33
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
-- Banco de dados: `quintaldaleitura`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `acervo`
--

CREATE TABLE `acervo` (
  `codigoRegisto` int(4) NOT NULL,
  `tituloDoLivro` varchar(100) NOT NULL,
  `editora` varchar(50) NOT NULL,
  `edicao` varchar(50) NOT NULL,
  `anoDePublicacao` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `acervo`
--

INSERT INTO `acervo` (`codigoRegisto`, `tituloDoLivro`, `editora`, `edicao`, `anoDePublicacao`) VALUES
(10, 'Matematica 1', 'Unoeste', '10 edição', '2023-02-01'),
(11, 'ingles Basico', 'aprender', '6 edição', '2020-02-03'),
(58, 'historia da arte 1', 'teclado', '10 edição', '2021-12-12'),
(65, 'historia da arte', 'aprender', '5 edição', '2021-05-21'),
(67, 'Matematica Financeira 1', 'teclado', '10 edição', '2021-02-05'),
(75, 'Inglês', 'humanas', '6 edição', '2023-12-05'),
(77, 'Inglês Avançado', 'Aprender', '10 edição', '2021-02-05'),
(78, 'Hora do aprender', 'Consiga ', '10 edição', '2021-02-05'),
(79, 'teclado 1', 'aprender', '5 edição', '2021-08-21'),
(80, 'html', 'aprender', '4 edição', '2022-02-05'),
(82, 'teste', 'aprender', '5 edicao', '2021-02-05'),
(83, 'A bela e a Fera', 'aprender ', '5 edição', '2023-10-04');

-- --------------------------------------------------------

--
-- Estrutura para tabela `autor`
--

CREATE TABLE `autor` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nacionalidade` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `autor`
--

INSERT INTO `autor` (`codigo`, `nome`, `nacionalidade`) VALUES
(1, 'William Shakespeare', 'Inglaterra'),
(2, 'Gabriel García Márquez', 'Colômbia'),
(3, 'Jane Austen	', 'Inglaterra'),
(4, 'Paulo Coelho', 'Brasil'),
(5, 'J.K. Rowling', 'Reino Unido'),
(6, 'Agatha Christie', 'Reino Unido'),
(7, 'Mark Twain', 'Americana');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `codigo` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`codigo`, `categoria`) VALUES
(1, 'Ação'),
(2, 'Romance'),
(5, 'Historia');

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimo`
--

CREATE TABLE `emprestimo` (
  `codigo` int(11) NOT NULL,
  `dataEmprestimo` date NOT NULL,
  `cpfPessoa` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `emprestimo`
--

INSERT INTO `emprestimo` (`codigo`, `dataEmprestimo`, `cpfPessoa`) VALUES
(1, '2023-10-10', '15935798565'),
(2, '2023-10-05', '12345689012'),
(3, '2023-05-10', '25896314798');

-- --------------------------------------------------------

--
-- Estrutura para tabela `emprestimo_exemplar`
--

CREATE TABLE `emprestimo_exemplar` (
  `codigoEmprestimo` int(11) NOT NULL,
  `codigoExemplar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `emprestimo_exemplar`
--

INSERT INTO `emprestimo_exemplar` (`codigoEmprestimo`, `codigoExemplar`) VALUES
(1, 1),
(2, 4),
(3, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `exemplar`
--

CREATE TABLE `exemplar` (
  `codigo` int(11) NOT NULL,
  `quantidade` int(11) DEFAULT NULL,
  `dataCadastro` varchar(12) DEFAULT NULL,
  `codigoAcervo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `exemplar`
--

INSERT INTO `exemplar` (`codigo`, `quantidade`, `dataCadastro`, `codigoAcervo`) VALUES
(1, 6, '2023-10-03', 83),
(2, 2, '2023-10-18', 10),
(3, 5, '2023-10-09', 75),
(4, 2, '2023-10-09', 65);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `cpf` varchar(16) NOT NULL,
  `categoria` varchar(16) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `sexo` varchar(16) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `cidade` varchar(50) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
  `cep` varchar(16) DEFAULT NULL,
  `dataNasc` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pessoa`
--

INSERT INTO `pessoa` (`cpf`, `categoria`, `nome`, `sexo`, `email`, `telefone`, `cidade`, `endereco`, `cep`, `dataNasc`) VALUES
('12345689012', 'Aluno', 'Jéssica', 'Feminino', 'jessica@gmail', '11 99887-9865', 'Maringá', 'Rua X, 96', '12365-987', '04/06/1997'),
('1236547854', 'Professor', 'Kezia', 'Feminino', 'keziaa@gmail.com', '18 985252-9874', 'Florianópolis', 'Rua JK', '12365-987', '24/11/1986'),
('15935798565', 'Funcionário', 'João', 'Masculino', 'joao@gmail.com', '12 528659-9875', 'Pirapozinho', 'Rua Flores', '12365-654', '19/01/2001'),
('25896314798', 'Aluno', 'Emanuel', 'Masculino', 'carlos@outlook.com', '18 98563-98756', 'Indiana', 'Rua Laranjeiras', '56632-986', '1998-07-12');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `cpf` varchar(14) NOT NULL,
  `nome` varchar(70) NOT NULL,
  `senha` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`cpf`, `nome`, `senha`) VALUES
('123.123.123-12', 'Emanuel Menossi', '12312412412312'),
('504.434.343-34', 'Kleber Alfredo', '123451234q2312312');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acervo`
--
ALTER TABLE `acervo`
  ADD PRIMARY KEY (`codigoRegisto`);

--
-- Índices de tabela `autor`
--
ALTER TABLE `autor`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigo`);

--
-- Índices de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_pessoa` (`cpfPessoa`);

--
-- Índices de tabela `emprestimo_exemplar`
--
ALTER TABLE `emprestimo_exemplar`
  ADD PRIMARY KEY (`codigoEmprestimo`,`codigoExemplar`),
  ADD KEY `fk_emprestimo_exemplar_exemp` (`codigoExemplar`);

--
-- Índices de tabela `exemplar`
--
ALTER TABLE `exemplar`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codigoAcervo` (`codigoAcervo`);

--
-- Índices de tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`cpf`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cpf`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acervo`
--
ALTER TABLE `acervo`
  MODIFY `codigoRegisto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de tabela `autor`
--
ALTER TABLE `autor`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `emprestimo`
--
ALTER TABLE `emprestimo`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `exemplar`
--
ALTER TABLE `exemplar`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `emprestimo`
--
ALTER TABLE `emprestimo`
  ADD CONSTRAINT `fk_pessoa` FOREIGN KEY (`cpfPessoa`) REFERENCES `pessoa` (`cpf`);

--
-- Restrições para tabelas `emprestimo_exemplar`
--
ALTER TABLE `emprestimo_exemplar`
  ADD CONSTRAINT `fk_emprestimo_exemplar_emp` FOREIGN KEY (`codigoEmprestimo`) REFERENCES `emprestimo` (`codigo`),
  ADD CONSTRAINT `fk_emprestimo_exemplar_exemp` FOREIGN KEY (`codigoExemplar`) REFERENCES `exemplar` (`codigo`);

--
-- Restrições para tabelas `exemplar`
--
ALTER TABLE `exemplar`
  ADD CONSTRAINT `exemplar_ibfk_1` FOREIGN KEY (`codigoAcervo`) REFERENCES `acervo` (`codigoRegisto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;




CREATE TABLE `devolucao` (
  `codigo` int(11) NOT NULL,
  `dataDevolucao` date NOT NULL,
  `cpfPessoa` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `devolucao` (`codigo`, `dataDevolucao`, `cpfPessoa`) VALUES
(1, '2023-10-15', '15935798565'),
(2, '2023-10-10', '12345689012'),
(3, '2023-05-19', '25896314798'),
(4, '2023-10-20', '15935798565'),
(5, '2023-10-13', '15935798565');

CREATE TABLE `devolucao_exemplar` (
  `codigoDevolucao` int(11) NOT NULL,
  `codigoExemplar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `devolucao_exemplar` (`codigoDevolucao`, `codigoExemplar`) VALUES
(1, 1),
(2, 4),
(3, 2),
(4, 2),
(5, 3);


ALTER TABLE `devolucao`
  ADD PRIMARY KEY (`codigo`),
  ADD CONSTRAINT `pessoa_fk` FOREIGN KEY (`cpfPessoa`) REFERENCES `pessoa` (`cpf`);

ALTER TABLE `devolucao_exemplar`
  ADD PRIMARY KEY (`codigoDevolucao`,`codigoExemplar`),
  ADD KEY `fk_devolucao_exemplar_exemp` (`codigoExemplar`);


ALTER TABLE `devolucao`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;