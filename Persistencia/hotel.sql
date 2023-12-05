
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
-- Estrutura para tabela `hospede`
--

CREATE TABLE `hospede` (
  `cpf` varchar(16) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `rg` varchar(12) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `endereco` varchar(100) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `hospede`
--

INSERT INTO `hospede` (`cpf`, `nome`, `rg`, `email`, `telefone`, `endereco`) VALUES
('111.111.111-11', 'Jéssica', '44.444.444-4', 'jessica@gmail', '11 99887-9865', 'Rua X, 96'),
('222.222.222-22', 'Kezia', '33.333.333-3', 'keziaa@gmail.com', '18 985252-9874', 'Rua JK',),
('333.333.333-33', 'João', '22.222.222-2', 'joao@gmail.com', '12 528659-9875', 'Rua Flores',),
('444.444.444-44', 'Emanuel', '11.111.111-1', 'carlos@outlook.com', '18 98563-98756', 'Rua Laranjeiras');

-- --------------------------------------------------------
--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `acervo`
--
ALTER TABLE `acervo`
  ADD PRIMARY KEY (`codigoRegisto`);

--
-- Índices de tabela `exemplar`
--
ALTER TABLE `exemplar`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `codigoAcervo` (`codigoAcervo`);

--
-- Índices de tabela `hospede`
--
ALTER TABLE `hospede`
  ADD PRIMARY KEY (`cpf`);

-- --------------------------------------------------------
--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `acervo`
--
ALTER TABLE `acervo`
  MODIFY `codigoRegisto` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT de tabela `exemplar`
--
ALTER TABLE `exemplar`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

-- --------------------------------------------------------
--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `exemplar`
--
ALTER TABLE `exemplar`
  ADD CONSTRAINT `exemplar_ibfk_1` FOREIGN KEY (`codigoAcervo`) REFERENCES `acervo` (`codigoRegisto`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

