-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2015 a las 12:31:59
-- Versión del servidor: 5.5.27
-- Versión de PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ciudadano`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE IF NOT EXISTS `actividad` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `tiempo` varchar(45) DEFAULT NULL,
  `tramite` int(3) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_actividad_evento1_idx` (`tramite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad_funcionario`
--

CREATE TABLE IF NOT EXISTS `actividad_funcionario` (
  `actividad` int(3) NOT NULL,
  `funcionario` int(2) NOT NULL,
  PRIMARY KEY (`actividad`,`funcionario`),
  KEY `fk_actividad_has_funcionario_funcionario1_idx` (`funcionario`),
  KEY `fk_actividad_has_funcionario_actividad1_idx` (`actividad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunidad`
--

CREATE TABLE IF NOT EXISTS `comunidad` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `rifletra` char(1) NOT NULL,
  `rifnumero` int(10) NOT NULL,
  `razonsocial` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `tlf1` int(10) unsigned DEFAULT '0',
  `tlf2` int(10) unsigned DEFAULT '0',
  `parroquia` int(7) NOT NULL,
  `persona` int(3) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comunidad_parroquia1_idx` (`parroquia`),
  KEY `fk_comunidad_persona1_idx` (`persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `comunidad`
--

INSERT INTO `comunidad` (`id`, `rifletra`, `rifnumero`, `razonsocial`, `direccion`, `correo`, `tlf1`, `tlf2`, `parroquia`, `persona`, `estatus`) VALUES
(1, 'J', 1234567, 'CONSEJO COMUNAL 24 DE JULIO ', 'URB. 24  DE JULIO', 'CONSEJO24@HOTMAIL.COM', 0, 0, 160101, 8, 1),
(2, 'J', 1234569, 'CONSEJO COMUNAL DE PATARATA I', 'DETRAS AV. LIBERTADOR', 'PATARATAI@GMAIL.COM', 0, 2511234567, 110201, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `division`
--

CREATE TABLE IF NOT EXISTS `division` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `ente` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_division_ente1_idx` (`ente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ente`
--

CREATE TABLE IF NOT EXISTS `ente` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `parroquia` int(7) DEFAULT NULL,
  `tipo` char(1) DEFAULT NULL,
  `tlf1` int(10) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ente_parroquia1_idx` (`parroquia`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=72 ;

--
-- Volcado de datos para la tabla `ente`
--

INSERT INTO `ente` (`id`, `nombre`, `parroquia`, `tipo`, `tlf1`, `direccion`, `estatus`) VALUES
(1, 'SECRETARIO GENERAL DE GOBIERNO', 110201, 'C', NULL, NULL, 1),
(2, 'SECRETARIA PRIVADA', 110201, 'C', NULL, NULL, 1),
(3, 'SECRETARIA DE ATENCION AL CIUDADANO', 110201, 'C', NULL, NULL, 1),
(4, 'COMISION DE COORDINACION PARA LA PARTICIPACION Y TRABAJO COMUNITARIO', 110201, 'C', NULL, NULL, 1),
(5, 'DIRECCION DE GESTION COMUNICACIONAL', 110201, 'C', NULL, NULL, 1),
(6, 'SALA SITUACIONAL ESTRATEGICA JUAN JACINTO LARA', 110201, 'C', NULL, NULL, 1),
(7, 'UNIDAD AUDITORIA INTERNA', 110201, 'C', NULL, NULL, 1),
(8, 'OFICINA DE PERSONAL', 110201, 'C', NULL, NULL, 1),
(9, 'OFICINA DE PLANIFICACION Y PRESUPUESTO', 110201, 'C', NULL, NULL, 1),
(10, 'OFICINA DE INFORMACION Y RELACIONES PUBLICAS ', 110201, 'C', NULL, NULL, 1),
(11, 'DIVISION DE PROTOCOLO', 110201, 'C', NULL, NULL, 1),
(12, 'OFICINA DE INFORMATICA', 110201, 'C', NULL, NULL, 1),
(13, 'OFICINA DE CONSULTORIA JURÃDICA', 110201, 'C', NULL, NULL, 1),
(14, 'D.G.S. DE EDUCACION', 110201, 'C', NULL, NULL, 1),
(15, 'D.G.S. DE INFRAESTRUCTURA', 110201, 'C', NULL, NULL, 1),
(16, 'D.G.S. DE DESARROLLO SOCIAL', 110201, 'C', NULL, NULL, 1),
(17, 'D.G.S. DE SALUD', 110201, 'C', NULL, NULL, 1),
(18, 'DIRECCION DE SANEAMIENTO AMBIENTAL Y  CONTRALORIA SANITARIA', 110201, 'C', NULL, NULL, 1),
(19, 'D.G.S. DE SEGURIDAD Y ORDEN PUBLICO', 110201, 'C', NULL, NULL, 1),
(20, 'DIRECCION DE COMUNICACIONES', 110201, 'C', NULL, NULL, 1),
(21, 'DIRECCION PROTECCION CIVIL', 110201, 'C', NULL, NULL, 1),
(22, 'CUERPO DE POLICIA DEL ESTADO LARA', 110201, 'C', NULL, NULL, 1),
(23, 'DIRECCION DE PREVENCION AL DELITO', 110201, 'C', NULL, NULL, 1),
(24, 'DIRECCION DE ASUNTOS CIVILES', 110201, 'C', NULL, NULL, 1),
(25, 'D.G.S. DE ADMINISTRACION Y FINANZAS', 110201, 'C', NULL, NULL, 1),
(26, 'DIRECCION TESORERIA GENERAL DEL ESTADO', 110201, 'C', NULL, NULL, 1),
(27, 'DIRECCION DE ADMINISTRACION', 110201, 'C', NULL, NULL, 1),
(28, 'DIRECCION DE FINANZAS', 110201, 'C', NULL, NULL, 1),
(29, 'DIRECCION DE SERVICIOS GENERALES', 110201, 'C', NULL, NULL, 1),
(30, 'CORTULARA', NULL, 'D', NULL, NULL, 1),
(31, 'CORPORACION DE DESARROLLO ENDOGENO Y SOCIAL', NULL, 'D', NULL, NULL, 1),
(32, 'HOSPITAL CENTRAL A.M.P.', NULL, 'D', NULL, NULL, 1),
(33, 'HOSPITAL PEDIATRICO', NULL, 'D', NULL, NULL, 1),
(34, 'FUSEL', NULL, 'D', NULL, NULL, 1),
(35, 'FUNREVI', NULL, 'D', NULL, NULL, 1),
(36, 'FUNDAESCOLAR', NULL, 'D', NULL, NULL, 1),
(37, 'FUNDACIÃ“N COMPLEJO TURÃSTICO AGROPECUARIO JUAN CANELON', NULL, 'D', NULL, NULL, 1),
(38, 'FUNDAPROMED', NULL, 'D', NULL, NULL, 1),
(39, 'FUNDACION TECNOPARQUE', NULL, 'D', NULL, NULL, 1),
(40, 'FUNDACION UNIDOS POR LA ESPERANZA (FUNLAES)', NULL, 'D', NULL, NULL, 1),
(41, 'FUNDEME', NULL, 'D', NULL, NULL, 1),
(42, 'FUNDELA', NULL, 'D', NULL, NULL, 1),
(43, 'FUNDAPYME', NULL, 'D', NULL, NULL, 1),
(44, 'FONDAEL', NULL, 'D', NULL, NULL, 1),
(45, 'FUNDASALUD', NULL, 'D', NULL, NULL, 1),
(46, 'FUNDACIÃ“N TEATRO JUÃRES', NULL, 'D', NULL, NULL, 1),
(47, 'FUNDACIÃ“N DEL NIÃ‘O DEJANDO HUELLAS', NULL, 'D', NULL, NULL, 1),
(48, 'INSTITUTO AUTONOMO IMPRENTA DEL ESTADO', NULL, 'D', NULL, NULL, 1),
(49, 'INSTITUTO AUTONOMO BIBLIOTECA PUBLICA PIO TAMAYO', NULL, 'D', NULL, NULL, 1),
(50, 'INFRALARA', NULL, 'D', NULL, NULL, 1),
(51, 'INSTITUTO REGIONAL DE LA JUVENTUD', NULL, 'D', NULL, NULL, 1),
(52, 'INVILARA', NULL, 'D', NULL, NULL, 1),
(53, 'INDALARA', NULL, 'D', NULL, NULL, 1),
(54, 'INSTITUTO REGIONAL DE LA MUJER  (IREMUJER)', NULL, 'D', NULL, NULL, 1),
(55, 'PROCURADURIA GENERAL DEL ESTADO', NULL, 'D', NULL, NULL, 1),
(56, 'SAATEL ', NULL, 'D', NULL, NULL, 1),
(57, 'SAINA LARA', NULL, 'D', NULL, NULL, 1),
(58, 'SERVICIO AUTONOMO ONCOLOGICO (SAO)', NULL, 'D', NULL, NULL, 1),
(59, 'CENTRO DE MANTENIMIENTO AUTOMOTRIZ DEL EDO LARA (CEMALARA)', NULL, 'D', NULL, NULL, 1),
(60, 'SERVICIO AUTONOMO DE EMERGENCIAS LARA 171', NULL, 'D', NULL, NULL, 1),
(61, 'CONCULTURA', NULL, 'D', NULL, NULL, 1),
(62, 'ESCUPOL', NULL, 'D', NULL, NULL, 1),
(63, 'SERVICIO DESCONCENTRADO PARQUE ZOOLÃ“GICO Y BOTÃNICO BARARIDA', NULL, 'D', NULL, NULL, 1),
(64, 'SOCIEDAD DE GARANTIAS RECIPROCAS', NULL, 'D', NULL, NULL, 1),
(65, 'METROBUS LARA', NULL, 'D', NULL, NULL, 1),
(66, 'HIDROLARA', NULL, 'D', NULL, NULL, 1),
(67, 'SIAMTEL', NULL, 'D', NULL, NULL, 1),
(68, 'SERVICIO DESCONCENTRADO PARQUE AUTOMOTOR CUER', NULL, 'D', NULL, NULL, 1),
(69, 'EMPEMSA', NULL, 'D', NULL, NULL, 1),
(70, 'CONSEJO ESTADAL PARA LA ATENCIÃ“N DE PERSONAS CON DISCAPACIDAD DEL ESTADO LARA (CEAPDIS) ', NULL, 'D', NULL, NULL, 1),
(71, 'CONSEJO DE PLANIFICACIÃ“N Y COORDINACIÃ“N DE POLÃTICAS PUBLICAS ', NULL, 'D', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ente_sector`
--

CREATE TABLE IF NOT EXISTS `ente_sector` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `ente` tinyint(2) NOT NULL,
  `sector` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ente_has_sector_sector1_idx` (`sector`),
  KEY `fk_ente_has_sector_ente1_idx` (`ente`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `ente_sector`
--

INSERT INTO `ente_sector` (`id`, `ente`, `sector`) VALUES
(1, 17, 1),
(2, 14, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE IF NOT EXISTS `estado` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=100 ;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`id`, `nombre`) VALUES
(1, 'DISTRITO CAPITAL'),
(2, 'ANZOÁTEGUI'),
(3, 'APURE'),
(4, 'ARAGUA'),
(5, 'BARINAS'),
(6, 'BOLÍVAR'),
(7, 'CARABOBO'),
(8, 'COJEDES'),
(9, 'FALCÓN'),
(10, 'GUÁRICO'),
(11, 'LARA'),
(12, 'MÉRIDA'),
(13, 'MIRANDA'),
(14, 'MONAGAS'),
(15, 'NUEVA ESPARTA'),
(16, 'PORTUGUESA'),
(17, 'SUCRE'),
(18, 'TÁCHIRA'),
(19, 'TRUJILLO'),
(20, 'YARACUY'),
(21, 'ZULIA'),
(22, 'AMAZONAS'),
(23, 'DELTA AMACURO'),
(24, 'VARGAS'),
(99, 'EMBAJADA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionario`
--

CREATE TABLE IF NOT EXISTS `funcionario` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `division` tinyint(2) DEFAULT NULL,
  `ente` tinyint(2) DEFAULT NULL,
  `usuario` int(2) NOT NULL,
  `persona` int(3) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_funcionario_division1_idx` (`division`),
  KEY `fk_funcionario_ente1_idx` (`ente`),
  KEY `fk_funcionario_usuario1_idx` (`usuario`),
  KEY `fk_funcionario_persona1_idx` (`persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Volcado de datos para la tabla `funcionario`
--

INSERT INTO `funcionario` (`id`, `division`, `ente`, `usuario`, `persona`, `estatus`) VALUES
(1, NULL, 3, 1, 1, 1),
(2, NULL, 67, 5, 2, 1),
(3, NULL, 70, 6, 7, 1),
(4, NULL, 61, 4, 6, 1),
(5, NULL, 66, 7, 5, 1),
(6, NULL, 67, 8, 10, 1),
(7, NULL, 70, 9, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historicoticket`
--

CREATE TABLE IF NOT EXISTS `historicoticket` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `ticket` int(4) NOT NULL,
  `funcionarioregistro` int(2) DEFAULT NULL,
  `fecharegistro` datetime DEFAULT NULL,
  `funcionariorecibido` int(2) DEFAULT NULL,
  `fecharecibido` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_historicoticket_ticket1_idx` (`ticket`),
  KEY `fk_historicoticket_funcionario1_idx` (`funcionarioregistro`),
  KEY `fk_historicoticket_funcionario2_idx` (`funcionariorecibido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `iconCls` varchar(255) DEFAULT NULL,
  `className` varchar(255) DEFAULT NULL,
  `controller` varchar(255) DEFAULT NULL,
  `padre` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_menu_menu1_idx` (`padre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id`, `text`, `iconCls`, `className`, `controller`, `padre`) VALUES
(1, 'Módulo Registros Básicos', 'menu_registro', NULL, NULL, NULL),
(2, 'Módulo Atención Ciudadano', 'menu_registro', NULL, NULL, NULL),
(3, 'Módulo Reportes', 'menu_registro', NULL, NULL, NULL),
(4, 'Registro de funcionario.', 'registro', 'panelFuncionario', 'registrobasico.funcionario.FuncionarioController', 1),
(5, 'Registro de solicitante.', 'registro', 'panelSolicitante', 'registrobasico.solicitante.SolicitanteController', 1),
(6, 'Registro de ente publico', 'registro', 'panelEnte', 'registrobasico.ente.EnteController', 1),
(7, 'Actualización de datos.', 'registro', 'panelSolicitante', 'registrobasico.solicitante.SolicitanteController', 1),
(8, 'Registro de ticket.', 'registro', 'panelTicket', 'ticket.TicketController', 2),
(9, 'Registro de ticket.', 'registro', 'panelTicketSolicitante', 'ticket.TicketSolicitanteController', 2),
(10, 'Registro de ticket.', 'registro', 'panelTicketLogueado', 'ticket.TicketLogueadoController', 2),
(11, 'Histórico de ticket.', 'registro', 'panelHistorico', 'ticket.HistoricoController', 2),
(12, 'Respuesta de ticket', 'registro', 'panelRespuesta', 'ticket.RespuestaController', 2),
(13, 'Ticket por municipio.', 'registro', 'panelTicketMunicipio', 'reporte.ReporteController', 3),
(14, 'Ticket por sector', 'registro', 'panelTicketSector', 'reporte.ReporteController', 3),
(15, 'Módulo de Tramites', 'menu_registro', NULL, NULL, NULL),
(16, 'Registro de Tramite', 'registro', 'panelTramite', 'tramite.TramiteController', 15),
(17, 'Registro de Actividad', 'registro', 'panelActividad', 'tramite.ActividadController', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_tipousuario`
--

CREATE TABLE IF NOT EXISTS `menu_tipousuario` (
  `menu` tinyint(2) NOT NULL,
  `tipousuario` tinyint(2) NOT NULL,
  PRIMARY KEY (`menu`,`tipousuario`),
  KEY `fk_tipousuario_has_menu_menu1_idx` (`menu`),
  KEY `fk_tipousuario_has_menu_tipousuario1_idx` (`tipousuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu_tipousuario`
--

INSERT INTO `menu_tipousuario` (`menu`, `tipousuario`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1),
(5, 2),
(5, 3),
(6, 1),
(7, 4),
(8, 3),
(10, 4),
(11, 1),
(11, 2),
(11, 3),
(11, 4),
(12, 1),
(12, 2),
(13, 1),
(13, 2),
(14, 1),
(14, 2),
(15, 2),
(16, 2),
(17, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE IF NOT EXISTS `municipio` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `estado` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_municipio_estado1_idx` (`estado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9997 ;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id`, `nombre`, `estado`) VALUES
(101, 'CE. BLVNO LIBERTADOR ', 1),
(201, 'MP. ANACO', 2),
(202, 'MP. ARAGUA ', 2),
(203, 'CE. BOLIVAR', 2),
(204, 'MP. BRUZUAL', 2),
(205, 'MP. CAJIGAL', 2),
(206, 'MP. FREITES', 2),
(207, 'MP. INDEPENDENCIA', 2),
(208, 'MP. LIBERTAD ', 2),
(209, 'MP. MIRANDA', 2),
(210, 'MP. MONAGAS', 2),
(211, 'MP. PEÑALVER ', 2),
(212, 'MP. SIMON RODRIGUEZ', 2),
(213, 'MP. SOTILLO', 2),
(214, 'MP. GUANIPA', 2),
(215, 'MP. GUANTA ', 2),
(216, 'MP. PIRITU ', 2),
(217, 'MP. L/DIEGO BAUTISTA ', 2),
(218, 'MP. CARVAJAL ', 2),
(219, 'MP. SANTA ANA', 2),
(220, 'MP. MC GREGOR', 2),
(221, 'MP.S JUAN CAPISTRANO ', 2),
(301, 'MP. ACHAGUAS ', 3),
(302, 'MP. MUÑOZ', 3),
(303, 'MP. PAEZ ', 3),
(304, 'MP. PEDRO CAMEJO ', 3),
(305, 'MP. ROMULO GALLEGOS', 3),
(306, 'CE. SAN FERNANDO ', 3),
(307, 'MP. BIRUACA', 3),
(401, 'CE. GIRARDOT ', 4),
(402, 'MP. SANTIAGO MARIÑO', 4),
(403, 'MP. JOSE FELIX RIVAS ', 4),
(404, 'MP. SAN CASIMIRO ', 4),
(405, 'MP. SAN SEBASTIAN', 4),
(406, 'MP. SUCRE', 4),
(407, 'MP. URDANETA ', 4),
(408, 'MP. ZAMORA ', 4),
(409, 'MP. LIBERTADOR ', 4),
(410, 'MP. JOSE ANGEL LAMAS ', 4),
(411, 'MP. BOLIVAR', 4),
(412, 'MP. SANTOS MICHELENA ', 4),
(413, 'MP. MARIO B IRAGORRY ', 4),
(414, 'MP. TOVAR', 4),
(415, 'MP. CAMATAGUA', 4),
(416, 'MP. JOSE R REVENGA ', 4),
(417, 'MP.FRANCISCO LINARES ', 4),
(418, 'MP.OCUMARE D L COSTA ', 4),
(501, 'MP. ARISMENDI', 5),
(502, 'CE. BARINAS', 5),
(503, 'MP. BOLIVAR', 5),
(504, 'MP. EZEQUIEL ZAMORA', 5),
(505, 'MP. OBISPOS', 5),
(506, 'MP. PEDRAZA', 5),
(507, 'MP. ROJAS', 5),
(508, 'MP. SOSA ', 5),
(509, 'MP. ALBERTO ARVELO T ', 5),
(510, 'MP. A JOSE DE SUCRE', 5),
(511, 'MP. CRUZ PAREDES ', 5),
(512, 'MP. ANDRES E. BLANCO ', 5),
(601, 'MP. CARONI ', 6),
(602, 'MP. CEDEÑO ', 6),
(603, 'CE. HERES', 6),
(604, 'MP. PIAR ', 6),
(605, 'MP. ROSCIO ', 6),
(606, 'MP. SUCRE', 6),
(607, 'MP. SIFONTES ', 6),
(608, 'MP. BLVNO ANGOSTURA', 6),
(609, 'MP. GRAN SABANA', 6),
(610, 'MP. EL CALLAO', 6),
(611, 'MP.PADRE PEDRO CHIEN ', 6),
(701, 'MP. BEJUMA ', 7),
(702, 'MP. CARLOS ARVELO', 7),
(703, 'MP. DIEGO IBARRA ', 7),
(704, 'MP. GUACARA', 7),
(705, 'MP. MONTALBAN', 7),
(706, 'MP. JUAN JOSE MORA ', 7),
(707, 'MP. PUERTO CABELLO ', 7),
(708, 'MP. SAN JOAQUIN', 7),
(709, 'CE. VALENCIA ', 7),
(710, 'MP. MIRANDA', 7),
(711, 'MP. LOS GUAYOS ', 7),
(712, 'MP. NAGUANAGUA ', 7),
(713, 'MP. SAN DIEGO', 7),
(714, 'MP. LIBERTADOR ', 7),
(801, 'MP. ANZOATEGUI ', 8),
(802, 'MP. FALCON ', 8),
(803, 'MP. GIRARDOT ', 8),
(804, 'MP. PAO S J BAUTISTA ', 8),
(805, 'MP. RICAURTE ', 8),
(806, 'CE. EZEQUIEL ZAMORA', 8),
(807, 'MP. TINACO ', 8),
(808, 'MP. LIMA BLANCO', 8),
(809, 'MP. ROMULO GALLEGOS', 8),
(901, 'MP. ACOSTA ', 9),
(902, 'MP. BOLIVAR', 9),
(903, 'MP. BUCHIVACOA ', 9),
(904, 'MP. CARIRUBANA ', 9),
(905, 'MP. COLINA ', 9),
(906, 'MP. DEMOCRACIA ', 9),
(907, 'MP. FALCON ', 9),
(908, 'MP. FEDERACION ', 9),
(909, 'MP. MAUROA ', 9),
(910, 'CE. MIRANDA', 9),
(911, 'MP. PETIT', 9),
(912, 'MP. SILVA', 9),
(913, 'MP. ZAMORA ', 9),
(914, 'MP. DABAJURO ', 9),
(915, 'MP. MONS. ITURRIZA ', 9),
(916, 'MP. LOS TAQUES ', 9),
(917, 'MP. PIRITU ', 9),
(918, 'MP. UNION', 9),
(919, 'MP. SAN FRANCISCO', 9),
(920, 'MP. JACURA ', 9),
(921, 'MP. CACIQUE MANAURE', 9),
(922, 'MP. PALMA SOLA ', 9),
(923, 'MP. SUCRE', 9),
(924, 'MP. URUMACO', 9),
(925, 'MP. TOCOPERO ', 9),
(1001, 'MP. INFANTE', 10),
(1002, 'MP. MELLADO', 10),
(1003, 'MP. MIRANDA', 10),
(1004, 'MP. MONAGAS', 10),
(1005, 'MP. RIBAS', 10),
(1006, 'CE. ROSCIO ', 10),
(1007, 'MP. ZARAZA ', 10),
(1008, 'MP. CAMAGUAN ', 10),
(1009, 'MP.S JOSE DE GUARIBE ', 10),
(1010, 'MP. LAS MERCEDES ', 10),
(1011, 'MP. EL SOCORRO ', 10),
(1012, 'MP. ORTIZ', 10),
(1013, 'MP. S MARIA DE IPIRE ', 10),
(1014, 'MP. CHAGUARAMAS', 10),
(1015, 'MP.SAN GERONIMO DE G ', 10),
(1101, 'MP. CRESPO ', 11),
(1102, 'CE. IRIBARREN', 11),
(1103, 'MP. JIMÉNEZ', 11),
(1104, 'MP. MORÁN', 11),
(1105, 'MP. PALAVECINO ', 11),
(1106, 'MP. TORRES ', 11),
(1107, 'MP. URDANETA ', 11),
(1108, 'MP. ANDRÉS ELOY BLANCO', 11),
(1109, 'MP. SIMÓN PLANAS ', 11),
(1201, 'MP. ALBERTO ADRIANI', 12),
(1202, 'MP. ANDRES BELLO ', 12),
(1203, 'MP. ARZOBISPO CHACON ', 12),
(1204, 'MP. CAMPO ELIAS', 12),
(1205, 'MP. GUARAQUE ', 12),
(1206, 'MP.JULIO CESAR SALAS ', 12),
(1207, 'MP. JUSTO BRICEÑO', 12),
(1208, 'CE. LIBERTADOR ', 12),
(1209, 'MP. SANTOS MARQUINA', 12),
(1210, 'MP. MIRANDA', 12),
(1211, 'MP. ANTONIO PINTO S. ', 12),
(1212, 'MP.OB. RAMOS DE LORA ', 12),
(1213, 'MP. CARACCIOLO PARRA ', 12),
(1214, 'MP.CARDENAL QUINTERO ', 12),
(1215, 'MP. PUEBLO LLANO ', 12),
(1216, 'MP. RANGEL ', 12),
(1217, 'MP. RIVAS DAVILA ', 12),
(1218, 'MP. SUCRE', 12),
(1219, 'MP. TOVAR', 12),
(1220, 'MP. TULIO F CORDERO', 12),
(1221, 'MP. PADRE NOGUERA', 12),
(1222, 'MP. ARICAGUA ', 12),
(1223, 'MP. ZEA', 12),
(1301, 'MP. ACEVEDO', 13),
(1302, 'MP. BRION', 13),
(1303, 'CE. GUAICAIPURO', 13),
(1304, 'MP. INDEPENDENCIA', 13),
(1305, 'MP. LANDER ', 13),
(1306, 'MP. PAEZ ', 13),
(1307, 'MP. PAZ CASTILLO ', 13),
(1308, 'MP. PLAZA', 13),
(1309, 'MP. SUCRE', 13),
(1310, 'MP. URDANETA ', 13),
(1311, 'MP. ZAMORA ', 13),
(1312, 'MP. CRISTOBAL ROJAS', 13),
(1313, 'MP. LOS SALIAS ', 13),
(1314, 'MP. ANDRES BELLO ', 13),
(1315, 'MP. SIMON BOLIVAR', 13),
(1316, 'MP. BARUTA ', 13),
(1317, 'MP. CARRIZAL ', 13),
(1318, 'MP. CHACAO ', 13),
(1319, 'MP. EL HATILLO ', 13),
(1320, 'MP. BUROZ', 13),
(1321, 'MP. PEDRO GUAL ', 13),
(1401, 'MP. ACOSTA ', 14),
(1402, 'MP. BOLIVAR', 14),
(1403, 'MP. CARIPE ', 14),
(1404, 'MP. CEDEÑO ', 14),
(1405, 'MP. EZEQUIEL ZAMORA', 14),
(1406, 'MP. LIBERTADOR ', 14),
(1407, 'CE. MATURIN', 14),
(1408, 'MP. PIAR ', 14),
(1409, 'MP. PUNCERES ', 14),
(1410, 'MP. SOTILLO', 14),
(1411, 'MP. AGUASAY', 14),
(1412, 'MP. SANTA BARBARA', 14),
(1413, 'MP. URACOA ', 14),
(1501, 'CE. ARISMENDI', 15),
(1502, 'MP. DIAZ ', 15),
(1503, 'MP. GOMEZ', 15),
(1504, 'MP. MANEIRO', 15),
(1505, 'MP. MARCANO', 15),
(1506, 'MP. MARIÑO ', 15),
(1507, 'MP.PENIN. DE MACANAO ', 15),
(1508, 'MP.VILLALBA(I.COCHE) ', 15),
(1509, 'MP. TUBORES', 15),
(1510, 'MP.ANTOLIN DEL CAMPO ', 15),
(1511, 'MP. GARCIA ', 15),
(1601, 'MP. ARAURE ', 16),
(1602, 'MP. ESTELLER ', 16),
(1603, 'CE. GUANARE', 16),
(1604, 'MP. GUANARITO', 16),
(1605, 'MP. OSPINO ', 16),
(1606, 'MP. PAEZ ', 16),
(1607, 'MP. SUCRE', 16),
(1608, 'MP. TUREN', 16),
(1609, 'MP. M.JOSE V DE UNDA ', 16),
(1610, 'MP. AGUA BLANCA', 16),
(1611, 'MP. PAPELON', 16),
(1612, 'MP.GENARO BOCONOITO', 16),
(1613, 'MP.S RAFAEL DE ONOTO ', 16),
(1614, 'MP. SANTA ROSALIA', 16),
(1701, 'MP. ARISMENDI', 17),
(1702, 'MP. BENITEZ', 17),
(1703, 'MP. BERMUDEZ ', 17),
(1704, 'MP. CAJIGAL', 17),
(1705, 'MP. MARIÑO ', 17),
(1706, 'MP. MEJIA', 17),
(1707, 'MP. MONTES ', 17),
(1708, 'MP. RIBERO ', 17),
(1709, 'CE. SUCRE', 17),
(1710, 'MP. VALDEZ ', 17),
(1711, 'MP. ANDRES E BLANCO', 17),
(1712, 'MP. LIBERTADOR ', 17),
(1713, 'MP. ANDRES MATA', 17),
(1714, 'MP. BOLIVAR', 17),
(1715, 'MP. CRUZ S ACOSTA', 17),
(1801, 'MP. AYACUCHO ', 18),
(1802, 'MP. BOLIVAR', 18),
(1803, 'MP. INDEPENDENCIA', 18),
(1804, 'MP. CARDENAS ', 18),
(1805, 'MP. JAUREGUI ', 18),
(1806, 'MP. JUNIN', 18),
(1807, 'MP. LOBATERA ', 18),
(1808, 'CE. SAN CRISTOBAL', 18),
(1809, 'MP. URIBANTE ', 18),
(1810, 'MP. CORDOBA', 18),
(1811, 'MP. GARCIA DE HEVIA', 18),
(1812, 'MP. GUASIMOS ', 18),
(1813, 'MP. MICHELENA', 18),
(1814, 'MP. LIBERTADOR ', 18),
(1815, 'MP. PANAMERICANO ', 18),
(1816, 'MP.PEDRO MARIA UREÑA ', 18),
(1817, 'MP. SUCRE', 18),
(1818, 'MP. ANDRES BELLO ', 18),
(1819, 'MP. FERNANDEZ FEO', 18),
(1820, 'MP. LIBERTAD ', 18),
(1821, 'MP. SAMUEL MALDONADO ', 18),
(1822, 'MP. SEBORUCO ', 18),
(1823, 'MP. ANTONIO ROMULO C ', 18),
(1824, 'MP. FCO DE MIRANDA ', 18),
(1825, 'MP. JOSE MARIA VARGA ', 18),
(1826, 'MP. RAFAEL URDANETA', 18),
(1827, 'MP. SIMON RODRIGUEZ', 18),
(1828, 'MP. TORBES ', 18),
(1829, 'MP. SAN JUDAS TADEO', 18),
(1901, 'MP. RAFAEL RANGEL', 19),
(1902, 'MP. BOCONO ', 19),
(1903, 'MP. CARACHE', 19),
(1904, 'MP. ESCUQUE', 19),
(1905, 'CE. TRUJILLO ', 19),
(1906, 'MP. URDANETA ', 19),
(1907, 'MP. VALERA ', 19),
(1908, 'MP. CANDELARIA ', 19),
(1909, 'MP. MIRANDA', 19),
(1910, 'MP. MONTE CARMELO', 19),
(1911, 'MP. MOTATAN', 19),
(1912, 'MP. PAMPAN ', 19),
(1913, 'MP.S RAFAEL CARVAJAL ', 19),
(1914, 'MP. SUCRE', 19),
(1915, 'MP. ANDRES BELLO ', 19),
(1916, 'MP. BOLIVAR', 19),
(1917, 'MP. JOSE F M CAÑIZAL ', 19),
(1918, 'MP. JUAN V CAMPO ELI ', 19),
(1919, 'MP. LA CEIBA ', 19),
(1920, 'MP. PAMPANITO', 19),
(2001, 'MP. BOLIVAR', 20),
(2002, 'MP. BRUZUAL', 20),
(2003, 'MP. NIRGUA ', 20),
(2004, 'CE. SAN FELIPE ', 20),
(2005, 'MP. SUCRE', 20),
(2006, 'MP. URACHICHE', 20),
(2007, 'MP. PEÑA ', 20),
(2008, 'MP.JOSE ANTONIO PAEZ ', 20),
(2009, 'MP. LA TRINIDAD', 20),
(2010, 'MP. COCOROTE ', 20),
(2011, 'MP. INDEPENDENCIA', 20),
(2012, 'MP. ARISTIDES BASTID ', 20),
(2013, 'MP. MANUEL MONGE ', 20),
(2014, 'MP. VEROES ', 20),
(2101, 'MP. BARALT ', 21),
(2102, 'MP. SANTA RITA ', 21),
(2103, 'MP. COLON', 21),
(2104, 'MP. MARA ', 21),
(2105, 'CE. MARACAIBO', 21),
(2106, 'MP. MIRANDA', 21),
(2107, 'MP.IDJ BLVNO GUAJIRA ', 21),
(2108, 'MP. MACHIQUES DE P ', 21),
(2109, 'MP. SUCRE', 21),
(2110, 'MP. LA CAÑADA DE U.', 21),
(2111, 'MP. LAGUNILLAS ', 21),
(2112, 'MP. CATATUMBO', 21),
(2113, 'MP.ROSARIO DE PERIJA ', 21),
(2114, 'MP. CABIMAS', 21),
(2115, 'MP.VALMORE RODRIGUEZ ', 21),
(2116, 'MP. JESUS E LOSSADA', 21),
(2117, 'MP. ALMIRANTE P', 21),
(2118, 'MP. SAN FRANCISCO', 21),
(2119, 'MP. JESUS M SEMPRUN', 21),
(2120, 'MP. FRANCISCO J PULG ', 21),
(2121, 'MP. SIMON BOLIVAR', 21),
(2201, 'CE. ATURES ', 22),
(2202, 'MP. ATABAPO', 22),
(2203, 'MP. MAROA', 22),
(2204, 'MP. RIO NEGRO', 22),
(2205, 'MP. AUTANA ', 22),
(2206, 'MP. MANAPIARE', 22),
(2207, 'MP. ALTO ORINOCO ', 22),
(2301, 'CE. TUCUPITA ', 23),
(2302, 'MP. PEDERNALES ', 23),
(2303, 'MP. ANTONIO DIAZ ', 23),
(2304, 'MP. CASACOIMA', 23),
(2401, 'CE. VARGAS ', 24),
(9901, 'ANTIGUA Y BARBUDA', 99),
(9902, 'ARABIA SAUDITA ', 99),
(9903, 'ARGELIA', 99),
(9904, 'ARGENTINA', 99),
(9905, 'AUSTRALIA', 99),
(9906, 'AUSTRIA', 99),
(9907, 'BARBADOS ', 99),
(9908, 'BELGICA', 99),
(9909, 'BELICE ', 99),
(9910, 'BOLIVIA', 99),
(9911, 'BRASIL ', 99),
(9912, 'BULGARIA ', 99),
(9913, 'CANADA ', 99),
(9914, 'CHECOLOVAQUIA', 99),
(9915, 'CHILE', 99),
(9916, 'CHINA', 99),
(9917, 'COLOMBIA ', 99),
(9918, 'COREA', 99),
(9919, 'COSTA RICA ', 99),
(9920, 'CUBA ', 99),
(9921, 'DINAMARCA', 99),
(9922, 'DOMINICA ', 99),
(9923, 'ECUADOR', 99),
(9924, 'EGIPTO ', 99),
(9925, 'EL SALVADOR', 99),
(9926, 'ESPAÃ‘A', 99),
(9927, 'USA', 99),
(9928, 'RUSIA', 99),
(9929, 'FILIPINAS', 99),
(9930, 'FINLANDIA', 99),
(9931, 'FRANCIA', 99),
(9932, 'GRAN BRETAÃ‘A', 99),
(9933, 'GRECIA ', 99),
(9934, 'GUATEMALA', 99),
(9935, 'GUAYANA', 99),
(9936, 'HAITI', 99),
(9937, 'HONDURAS ', 99),
(9938, 'HUNGRIA', 99),
(9939, 'INDIA', 99),
(9940, 'INDONESIA', 99),
(9941, 'IRAK ', 99),
(9942, 'ISRAEL ', 99),
(9943, 'ITALIA ', 99),
(9944, 'JAMAICA', 99),
(9945, 'JAPON', 99),
(9946, 'KENIA', 99),
(9947, 'KUWAIT ', 99),
(9948, 'LIBANO ', 99),
(9949, 'LIBIA', 99),
(9950, 'MALASIA', 99),
(9951, 'MARRUECOS', 99),
(9952, 'MEXICO ', 99),
(9953, 'NAMIBIA', 99),
(9954, 'NICARAGUA', 99),
(9955, 'NIGERIA', 99),
(9956, 'NORUEGA', 99),
(9957, 'PAISES BAJOS ', 99),
(9958, 'PANAMA ', 99),
(9959, 'PARAGUAY ', 99),
(9960, 'PERU ', 99),
(9961, 'POLONIA', 99),
(9962, 'PORTUGAL ', 99),
(9963, 'REPUBLICA DOMINICANA ', 99),
(9964, 'ALEMANIA ', 99),
(9965, 'IRAN ', 99),
(9966, 'RUMANIA', 99),
(9967, 'SAN KITTS Y NEVIS', 99),
(9968, 'SAN VICENTE Y LAS GR ', 99),
(9969, 'SANTA LUCIA', 99),
(9970, 'SIRIA', 99),
(9971, 'SUDAFRICA', 99),
(9972, 'SUECIA ', 99),
(9973, 'SUIZA', 99),
(9974, 'SURINAME ', 99),
(9975, 'TRINIDAD Y TOBAGO', 99),
(9976, 'TURQUIA', 99),
(9977, 'URUGUAY', 99),
(9978, 'GRENADA', 99),
(9979, 'SANTA LUCIA', 99),
(9980, 'QATAR', 99),
(9981, 'PALESTINA', 99),
(9982, 'ETIOPIA', 99),
(9983, 'VIETNAM', 99),
(9984, 'SINGAPUR ', 99),
(9985, 'SENEGAL', 99),
(9986, 'MALI ', 99),
(9987, 'ANGOLA ', 99),
(9988, 'BENIN', 99),
(9989, 'CONGO', 99),
(9990, 'GUINEA ECUATORIAL', 99),
(9991, 'GAMBIA ', 99),
(9992, 'MOZAMBIQUE ', 99),
(9993, 'SUDAN', 99),
(9994, 'EMIRATOS ARABES UNID ', 99),
(9995, 'CURAZAO', 99),
(9996, 'BIELORRUSIA', 99);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parroquia`
--

CREATE TABLE IF NOT EXISTS `parroquia` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `municipio` int(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_parroquia_municipio1_idx` (`municipio`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=999602 ;

--
-- Volcado de datos para la tabla `parroquia`
--

INSERT INTO `parroquia` (`id`, `nombre`, `municipio`) VALUES
(10101, 'PQ. ALTAGRACIA ', 101),
(10102, 'PQ. CANDELARIA ', 101),
(10103, 'PQ. CATEDRAL ', 101),
(10104, 'PQ. LA PASTORA ', 101),
(10105, 'PQ. SAN AGUSTIN', 101),
(10106, 'PQ. SAN JOSE ', 101),
(10107, 'PQ. SAN JUAN ', 101),
(10108, 'PQ. SANTA ROSALIA', 101),
(10109, 'PQ. SANTA TERESA ', 101),
(10110, 'PQ. SUCRE', 101),
(10111, 'PQ. 23 DE ENERO', 101),
(10112, 'PQ. ANTIMANO ', 101),
(10113, 'PQ. EL RECREO', 101),
(10114, 'PQ. EL VALLE ', 101),
(10115, 'PQ. LA VEGA', 101),
(10116, 'PQ. MACARAO', 101),
(10117, 'PQ. CARICUAO ', 101),
(10118, 'PQ. EL JUNQUITO', 101),
(10119, 'PQ. COCHE', 101),
(10120, 'PQ. SAN PEDRO', 101),
(10121, 'PQ. SAN BERNARDINO ', 101),
(10122, 'PQ. EL PARAISO ', 101),
(20101, 'PQ. ANACO', 201),
(20102, 'PQ. SAN JOAQUIN', 201),
(20201, 'CM. ARAGUA DE BARCELONA', 202),
(20202, 'PQ. CACHIPO', 202),
(20301, 'PQ. EL CARMEN', 203),
(20302, 'PQ. SAN CRISTOBAL', 203),
(20303, 'PQ. BERGANTIN', 203),
(20304, 'PQ. CAIGUA ', 203),
(20305, 'PQ. EL PILAR ', 203),
(20306, 'PQ. NARICUAL ', 203),
(20401, 'CM. CLARINES ', 204),
(20402, 'PQ. GUANAPE', 204),
(20403, 'PQ. SABANA DE UCHIRE ', 204),
(20501, 'CM. ONOTO', 205),
(20502, 'PQ. SAN PABLO', 205),
(20601, 'CM. CANTAURA ', 206),
(20602, 'PQ. LIBERTADOR ', 206),
(20603, 'PQ. SANTA ROSA ', 206),
(20604, 'PQ. URICA', 206),
(20701, 'CM. SOLEDAD', 207),
(20702, 'PQ. MAMO ', 207),
(20801, 'CM. SAN MATEO', 208),
(20802, 'PQ. EL CARITO', 208),
(20803, 'PQ. SANTA INES ', 208),
(20901, 'CM. PARIAGUAN', 209),
(20902, 'PQ. ATAPIRIRE', 209),
(20903, 'PQ. BOCA DEL PAO ', 209),
(20904, 'PQ. EL PAO ', 209),
(21001, 'CM. MAPIRE ', 210),
(21002, 'PQ. PIAR ', 210),
(21003, 'PQ. SN DIEGO DE CABRUTICA', 210),
(21004, 'PQ. SANTA CLARA', 210),
(21005, 'PQ. UVERITO', 210),
(21006, 'PQ. ZUATA', 210),
(21101, 'CM. PUERTO PIRITU', 211),
(21102, 'PQ. SAN MIGUEL ', 211),
(21103, 'PQ. SUCRE', 211),
(21201, 'CM. EL TIGRE ', 212),
(21301, 'PQ. POZUELOS ', 213),
(21302, 'CM. PUERTO LA CRUZ ', 213),
(21401, 'CM. SAN JOSE DE GUANIPA', 214),
(21501, 'PQ. GUANTA ', 215),
(21502, 'PQ. CHORRERON', 215),
(21601, 'PQ. PIRITU ', 216),
(21602, 'PQ. SAN FRANCISCO', 216),
(21701, 'PQ. LECHERIAS', 217),
(21702, 'PQ. EL MORRO ', 217),
(21801, 'PQ. VALLE GUANAPE', 218),
(21802, 'PQ. SANTA BARBARA', 218),
(21901, 'PQ. SANTA ANA', 219),
(21902, 'PQ. PUEBLO NUEVO ', 219),
(22001, 'PQ. EL CHAPARRO', 220),
(22002, 'PQ.TOMAS ALFARO CALATRAVA', 220),
(22101, 'PQ. BOCA UCHIRE', 221),
(22102, 'PQ. BOCA DE CHAVEZ ', 221),
(30101, 'PQ. ACHAGUAS ', 301),
(30102, 'PQ. APURITO', 301),
(30103, 'PQ. EL YAGUAL', 301),
(30104, 'PQ. GUACHARA ', 301),
(30105, 'PQ. MUCURITAS', 301),
(30106, 'PQ. QUESERAS DEL MEDIO ', 301),
(30201, 'PQ. BRUZUAL', 302),
(30202, 'PQ. MANTECAL ', 302),
(30203, 'PQ. QUINTERO ', 302),
(30204, 'PQ. SAN VICENTE', 302),
(30205, 'PQ. RINCON HONDO ', 302),
(30301, 'PQ. GUASDUALITO', 303),
(30302, 'PQ. ARAMENDI ', 303),
(30303, 'PQ. EL AMPARO', 303),
(30304, 'PQ. SAN CAMILO ', 303),
(30305, 'PQ. URDANETA ', 303),
(30401, 'PQ. SAN JUAN DE PAYARA ', 304),
(30402, 'PQ. CODAZZI', 304),
(30403, 'PQ. CUNAVICHE', 304),
(30501, 'PQ. ELORZA ', 305),
(30502, 'PQ. LA TRINIDAD', 305),
(30601, 'PQ. SAN FERNANDO ', 306),
(30602, 'PQ. PEÑALVER ', 306),
(30603, 'PQ. EL RECREO', 306),
(30604, 'PQ. SN RAFAEL DE ATAMAICA', 306),
(30701, 'PQ. BIRUACA', 307),
(40101, 'PQ. LAS DELICIAS ', 401),
(40102, 'PQ. CHORONI', 401),
(40103, 'PQ. MADRE MA DE SAN JOSE ', 401),
(40104, 'PQ. JOAQUIN CRESPO ', 401),
(40105, 'PQ. PEDRO JOSE OVALLES ', 401),
(40106, 'PQ. JOSE CASANOVA GODOY', 401),
(40107, 'PQ. ANDRES ELOY BLANCO ', 401),
(40108, 'PQ. LOS TACARIGUAS ', 401),
(40201, 'CM. TURMERO', 402),
(40202, 'PQ. SAMAN DE GUERE ', 402),
(40203, 'PQ. ALFREDO PACHECO M', 402),
(40204, 'PQ. CHUAO', 402),
(40205, 'PQ. AREVALO APONTE ', 402),
(40301, 'CM. LA VICTORIA', 403),
(40302, 'PQ. ZUATA', 403),
(40303, 'PQ. PAO DE ZARATE', 403),
(40304, 'PQ. CASTOR NIEVES RIOS ', 403),
(40305, 'PQ. LAS GUACAMAYAS ', 403),
(40401, 'CM. SAN CASIMIRO ', 404),
(40402, 'PQ. VALLE MORIN', 404),
(40403, 'PQ. GUIRIPA', 404),
(40404, 'PQ. OLLAS DE CARAMACATE', 404),
(40501, 'CM. SAN SEBASTIAN', 405),
(40601, 'CM. CAGUA', 406),
(40602, 'PQ. BELLA VISTA', 406),
(40701, 'CM. BARBACOAS', 407),
(40702, 'PQ. SAN FRANCISCO DE CARA', 407),
(40703, 'PQ. TAGUAY ', 407),
(40704, 'PQ. LAS PEÑITAS', 407),
(40801, 'CM. VILLA DE CURA', 408),
(40802, 'PQ. MAGDALENO', 408),
(40803, 'PQ. SAN FRANCISCO DE ASIS', 408),
(40804, 'PQ. VALLES DE TUCUTUNEMO ', 408),
(40805, 'PQ. PQ AUGUSTO MIJARES ', 408),
(40901, 'CM. PALO NEGRO ', 409),
(40902, 'PQ. SAN MARTIN DE PORRES ', 409),
(41001, 'CM. SANTA CRUZ ', 410),
(41101, 'CM. SAN MATEO', 411),
(41201, 'CM. LAS TEJERIAS ', 412),
(41202, 'PQ. TIARA', 412),
(41301, 'CM. EL LIMON ', 413),
(41302, 'PQ. CA A DE AZUCAR ', 413),
(41401, 'CM. COLONIA TOVAR', 414),
(41501, 'CM. CAMATAGUA', 415),
(41502, 'PQ. CARMEN DE CURA ', 415),
(41601, 'CM. EL CONSEJO ', 416),
(41701, 'CM. SANTA RITA ', 417),
(41702, 'PQ. FRANCISCO DE MIRANDA ', 417),
(41703, 'PQ. MONS FELICIANO G ', 417),
(41801, 'PQ. OCUMARE DE LA COSTA', 418),
(50101, 'PQ. ARISMENDI', 501),
(50102, 'PQ. GUADARRAMA ', 501),
(50103, 'PQ. LA UNION ', 501),
(50104, 'PQ. SAN ANTONIO', 501),
(50201, 'PQ. ALFREDO A LARRIVA', 502),
(50202, 'PQ. BARINAS', 502),
(50203, 'PQ. SAN SILVESTRE', 502),
(50204, 'PQ. SANTA INES ', 502),
(50205, 'PQ. SANTA LUCIA', 502),
(50206, 'PQ. TORUNOS', 502),
(50207, 'PQ. EL CARMEN', 502),
(50208, 'PQ. ROMULO BETANCOURT', 502),
(50209, 'PQ. CORAZON DE JESUS ', 502),
(50210, 'PQ. RAMON I MENDEZ ', 502),
(50211, 'PQ. ALTO BARINAS ', 502),
(50212, 'PQ. MANUEL P FAJARDO ', 502),
(50213, 'PQ. JUAN A RODRIGUEZ D ', 502),
(50214, 'PQ. DOMINGA ORTIZ P', 502),
(50301, 'PQ. ALTAMIRA ', 503),
(50302, 'PQ. BARINITAS', 503),
(50303, 'PQ. CALDERAS ', 503),
(50401, 'PQ. SANTA BARBARA', 504),
(50402, 'PQ.JOSE IGNACIO DEL PUMAR', 504),
(50403, 'PQ. RAMON IGNACIO MENDEZ ', 504),
(50404, 'PQ. PEDRO BRICEÑO MENDEZ ', 504),
(50501, 'PQ. EL REAL', 505),
(50502, 'PQ. LA LUZ ', 505),
(50503, 'PQ. OBISPOS', 505),
(50504, 'PQ. LOS GUASIMITOS ', 505),
(50601, 'PQ. CIUDAD BOLIVIA ', 506),
(50602, 'PQ. IGNACIO BRICEÑO', 506),
(50603, 'PQ. PAEZ ', 506),
(50604, 'PQ. JOSE FELIX RIBAS ', 506),
(50701, 'PQ. DOLORES', 507),
(50702, 'PQ. LIBERTAD ', 507),
(50703, 'PQ. PALACIO FAJARDO', 507),
(50704, 'PQ. SANTA ROSA ', 507),
(50705, 'PQ. SIMÃ“N RODRÃGUEZ', 507),
(50801, 'PQ. CIUDAD DE NUTRIAS', 508),
(50802, 'PQ. EL REGALO', 508),
(50803, 'PQ. PUERTO DE NUTRIAS', 508),
(50804, 'PQ. SANTA CATALINA ', 508),
(50805, 'PQ. SIMÃ“N BOLÃVAR', 508),
(50901, 'PQ. RODRIGUEZ DOMINGUEZ', 509),
(50902, 'PQ. SABANETA ', 509),
(51001, 'PQ. TICOPORO ', 510),
(51002, 'PQ. NICOLAS PULIDO ', 510),
(51003, 'PQ. ANDRES BELLO ', 510),
(51101, 'PQ. BARRANCAS', 511),
(51102, 'PQ. EL SOCORRO ', 511),
(51103, 'PQ. MASPARRITO ', 511),
(51201, 'PQ. EL CANTON', 512),
(51202, 'PQ. SANTA CRUZ DE GUACAS ', 512),
(51203, 'PQ. PUERTO VIVAS ', 512),
(60101, 'PQ. SIMON BOLIVAR', 601),
(60102, 'PQ. ONCE DE ABRIL', 601),
(60103, 'PQ. VISTA AL SOL ', 601),
(60104, 'PQ. CHIRICA', 601),
(60105, 'PQ. DALLA COSTA', 601),
(60106, 'PQ. CACHAMAY ', 601),
(60107, 'PQ. UNIVERSIDAD', 601),
(60108, 'PQ. UNARE', 601),
(60109, 'PQ. YOCOIMA', 601),
(60110, 'PQ. POZO VERDE ', 601),
(60201, 'CM. CAICARA DEL ORINOCO', 602),
(60202, 'PQ. ASCENSION FARRERAS ', 602),
(60203, 'PQ. ALTAGRACIA ', 602),
(60204, 'PQ. LA URBANA', 602),
(60205, 'PQ. GUANIAMO ', 602),
(60206, 'PQ. PIJIGUAOS', 602),
(60301, 'PQ. CATEDRAL ', 603),
(60302, 'PQ. AGUA SALADA', 603),
(60303, 'PQ. LA SABANITA', 603),
(60304, 'PQ. VISTA HERMOSA', 603),
(60305, 'PQ. MARHUANTA', 603),
(60306, 'PQ. JOSE ANTONIO PAEZ', 603),
(60307, 'PQ. ORINOCO', 603),
(60308, 'PQ. PANAPANA ', 603),
(60309, 'PQ. ZEA', 603),
(60401, 'CM. UPATA', 604),
(60402, 'PQ. ANDRES ELOY BLANCO ', 604),
(60403, 'PQ. PEDRO COVA ', 604),
(60501, 'CM. GUASIPATI', 605),
(60502, 'PQ. SALOM', 605),
(60601, 'CM. MARIPA ', 606),
(60602, 'PQ. ARIPAO ', 606),
(60603, 'PQ. LAS MAJADAS', 606),
(60604, 'PQ. MOITACO', 606),
(60605, 'PQ. GUARATARO', 606),
(60701, 'CM. TUMEREMO ', 607),
(60702, 'PQ. DALLA COSTA', 607),
(60703, 'PQ. SAN ISIDRO ', 607),
(60801, 'CM. CIUDAD PIAR', 608),
(60802, 'PQ. SAN FRANCISCO', 608),
(60803, 'PQ. BARCELONETA', 608),
(60804, 'PQ. SANTA BARBARA', 608),
(60901, 'CM. SANTA ELENA DE UAIREN', 609),
(60902, 'PQ. IKABARU', 609),
(61001, 'CM. EL CALLAO', 610),
(61101, 'CM. EL PALMAR', 611),
(70101, 'PQ. BEJUMA ', 701),
(70102, 'PQ. CANOABO', 701),
(70103, 'PQ. SIMON BOLIVAR', 701),
(70201, 'PQ. GUIGUE ', 702),
(70202, 'PQ. BELEN', 702),
(70203, 'PQ. TACARIGUA', 702),
(70301, 'PQ. MARIARA', 703),
(70302, 'PQ. AGUAS CALIENTES', 703),
(70401, 'PQ. GUACARA', 704),
(70402, 'PQ. CIUDAD ALIANZA ', 704),
(70403, 'PQ. YAGUA', 704),
(70501, 'PQ. MONTALBAN', 705),
(70601, 'PQ. MORON', 706),
(70602, 'PQ. URAMA', 706),
(70701, 'PQ. DEMOCRACIA ', 707),
(70702, 'PQ. FRATERNIDAD', 707),
(70703, 'PQ. GOAIGOAZA', 707),
(70704, 'PQ. JUAN JOSE FLORES ', 707),
(70705, 'PQ. BARTOLOME SALOM', 707),
(70706, 'PQ. UNION', 707),
(70707, 'PQ. BORBURATA', 707),
(70708, 'PQ. PATANEMO ', 707),
(70801, 'PQ. SAN JOAQUIN', 708),
(70901, 'PQ. CANDELARIA ', 709),
(70902, 'PQ. CATEDRAL ', 709),
(70903, 'PQ. EL SOCORRO ', 709),
(70904, 'PQ. MIGUEL PEÑA', 709),
(70905, 'PQ. SAN BLAS ', 709),
(70906, 'PQ. SAN JOSE ', 709),
(70907, 'PQ. SANTA ROSA ', 709),
(70908, 'PQ. RAFAEL URDANETA', 709),
(70909, 'PQ. NEGRO PRIMERO', 709),
(71001, 'PQ. MIRANDA', 710),
(71101, 'PQ. U LOS GUAYOS ', 711),
(71201, 'PQ. NAGUANAGUA ', 712),
(71301, 'PQ. URB SAN DIEGO', 713),
(71401, 'PQ. U TOCUYITO ', 714),
(71402, 'PQ. U INDEPENDENCIA', 714),
(80101, 'PQ. COJEDES', 801),
(80102, 'PQ. JUAN DE MATA SUAREZ', 801),
(80201, 'PQ. TINAQUILLO ', 802),
(80301, 'PQ. EL BAUL', 803),
(80302, 'PQ. SUCRE', 803),
(80401, 'PQ. EL PAO ', 804),
(80501, 'PQ. LIBERTAD DE COJEDES', 805),
(80502, 'PQ. EL AMPARO', 805),
(80601, 'PQ. SAN CARLOS DE AUSTRIA', 806),
(80602, 'PQ. JUAN ANGEL BRAVO ', 806),
(80603, 'PQ. MANUEL MANRIQUE', 806),
(80701, 'PQ. GRL/JEFE JOSE L SILVA', 807),
(80801, 'PQ. MACAPO ', 808),
(80802, 'PQ. LA AGUADITA', 808),
(80901, 'PQ. ROMULO GALLEGOS', 809),
(90101, 'PQ. SAN JUAN DE LOS CAYOS', 901),
(90102, 'PQ. CAPADARE ', 901),
(90103, 'PQ. LA PASTORA ', 901),
(90104, 'PQ. LIBERTADOR ', 901),
(90201, 'PQ. SAN LUIS ', 902),
(90202, 'PQ. ARACUA ', 902),
(90203, 'PQ. LA PEÑA', 902),
(90301, 'PQ. CAPATARIDA ', 903),
(90302, 'PQ. BOROJO ', 903),
(90303, 'PQ. SEQUE', 903),
(90304, 'PQ. ZAZARIDA ', 903),
(90305, 'PQ. BARIRO ', 903),
(90306, 'PQ. GUAJIRO', 903),
(90401, 'PQ. NORTE', 904),
(90402, 'PQ. CARIRUBANA ', 904),
(90403, 'PQ. PUNTA CARDON ', 904),
(90404, 'PQ. SANTA ANA', 904),
(90501, 'PQ. LA VELA DE CORO', 905),
(90502, 'PQ. ACURIGUA ', 905),
(90503, 'PQ. GUAIBACOA', 905),
(90504, 'PQ. MACORUCA ', 905),
(90505, 'PQ. LAS CALDERAS ', 905),
(90601, 'PQ. PEDREGAL ', 906),
(90602, 'PQ. AGUA CLARA ', 906),
(90603, 'PQ. AVARIA ', 906),
(90604, 'PQ. PIEDRA GRANDE', 906),
(90605, 'PQ. PURURECHE', 906),
(90701, 'PQ. PUEBLO NUEVO ', 907),
(90702, 'PQ. ADICORA', 907),
(90703, 'PQ. BARAIVED ', 907),
(90704, 'PQ. BUENA VISTA', 907),
(90705, 'PQ. JADACAQUIVA', 907),
(90706, 'PQ. MORUY', 907),
(90707, 'PQ. EL VINCULO ', 907),
(90708, 'PQ. EL HATO', 907),
(90709, 'PQ. ADAURE ', 907),
(90801, 'PQ. CHURUGUARA ', 908),
(90802, 'PQ. AGUA LARGA ', 908),
(90803, 'PQ. INDEPENDENCIA', 908),
(90804, 'PQ. MAPARARI ', 908),
(90805, 'PQ. EL PAUJI ', 908),
(90901, 'PQ. MENE DE MAUROA ', 909),
(90902, 'PQ. CASIGUA', 909),
(90903, 'PQ. SAN FELIX', 909),
(91001, 'PQ. SAN ANTONIO', 910),
(91002, 'PQ. SAN GABRIEL', 910),
(91003, 'PQ. SANTA ANA', 910),
(91004, 'PQ. GUZMAN GUILLERMO ', 910),
(91005, 'PQ. MITARE ', 910),
(91006, 'PQ. SABANETA ', 910),
(91007, 'PQ. RIO SECO ', 910),
(91101, 'PQ. CABURE ', 911),
(91102, 'PQ. CURIMAGUA', 911),
(91103, 'PQ. COLINA ', 911),
(91201, 'PQ. TUCACAS', 912),
(91202, 'PQ. BOCA DE AROA ', 912),
(91301, 'PQ. PUERTO CUMAREBO', 913),
(91302, 'PQ. LA CIENAGA ', 913),
(91303, 'PQ. LA SOLEDAD ', 913),
(91304, 'PQ. PUEBLO CUMAREBO', 913),
(91305, 'PQ. ZAZARIDA ', 913),
(91401, 'CM. DABAJURO ', 914),
(91501, 'PQ. CHICHIRIVICHE', 915),
(91502, 'PQ. BOCA DE TOCUYO ', 915),
(91503, 'PQ. TOCUYO DE LA COSTA ', 915),
(91601, 'PQ. LOS TAQUES ', 916),
(91602, 'PQ. JUDIBANA ', 916),
(91701, 'PQ. PIRITU ', 917),
(91702, 'PQ. SAN JOSE DE LA COSTA ', 917),
(91801, 'PQ. STA.CRUZ DE BUCARAL', 918),
(91802, 'PQ. EL CHARAL', 918),
(91803, 'PQ. LAS VEGAS DEL TUY', 918),
(91901, 'CM. MIRIMIRE ', 919),
(92001, 'PQ. JACURA ', 920),
(92002, 'PQ. AGUA LINDA ', 920),
(92003, 'PQ. ARAURIMA ', 920),
(92101, 'CM. YARACAL', 921),
(92201, 'CM. PALMA SOLA ', 922),
(92301, 'PQ. SUCRE', 923),
(92302, 'PQ. PECAYA ', 923),
(92401, 'PQ. URUMACO', 924),
(92402, 'PQ. BRUZUAL', 924),
(92501, 'CM. TOCOPERO ', 925),
(100101, 'PQ. VALLE DE LA PASCUA ', 1001),
(100102, 'PQ. ESPINO ', 1001),
(100201, 'PQ. EL SOMBRERO', 1002),
(100202, 'PQ. SOSA ', 1002),
(100301, 'PQ. CALABOZO ', 1003),
(100302, 'PQ. EL CALVARIO', 1003),
(100303, 'PQ. EL RASTRO', 1003),
(100304, 'PQ. GUARDATINAJAS', 1003),
(100401, 'PQ. ALTAGRACIA DE ORITUCO', 1004),
(100402, 'PQ. LEZAMA ', 1004),
(100403, 'PQ. LIBERTAD DE ORITUCO', 1004),
(100404, 'PQ. SAN FCO DE MACAIRA ', 1004),
(100405, 'PQ. SAN RAFAEL DE ORITUCO', 1004),
(100406, 'PQ. SOUBLETTE', 1004),
(100407, 'PQ. PASO REAL DE MACAIRA ', 1004),
(100501, 'PQ. TUCUPIDO ', 1005),
(100502, 'PQ. SAN RAFAEL DE LAYA ', 1005),
(100601, 'PQ.SAN JUAN DE LOS MORROS', 1006),
(100602, 'PQ. PARAPARA ', 1006),
(100603, 'PQ. CANTAGALLO ', 1006),
(100701, 'PQ. ZARAZA ', 1007),
(100702, 'PQ. SAN JOSE DE UNARE', 1007),
(100801, 'PQ. CAMAGUAN ', 1008),
(100802, 'PQ. PUERTO MIRANDA ', 1008),
(100803, 'PQ. UVERITO', 1008),
(100901, 'PQ. SAN JOSE DE GUARIBE', 1009),
(101001, 'PQ. LAS MERCEDES ', 1010),
(101002, 'PQ. STA RITA DE MANAPIRE ', 1010),
(101003, 'PQ. CABRUTA', 1010),
(101101, 'PQ. EL SOCORRO ', 1011),
(101201, 'PQ. ORTIZ', 1012),
(101202, 'PQ. SAN FCO. DE TIZNADOS ', 1012),
(101203, 'PQ. SAN JOSE DE TIZNADOS ', 1012),
(101204, 'PQ. S LORENZO DE TIZNADOS', 1012),
(101301, 'PQ. SANTA MARIA DE IPIRE ', 1013),
(101302, 'PQ. ALTAMIRA ', 1013),
(101401, 'PQ. CHAGUARAMAS', 1014),
(101501, 'PQ. GUAYABAL ', 1015),
(101502, 'PQ. CAZORLA', 1015),
(110101, 'PQ. FREITEZ', 1101),
(110102, 'PQ. JOSE MARIA BLANCO', 1101),
(110201, 'PQ. CATEDRAL ', 1102),
(110202, 'PQ. LA CONCEPCION', 1102),
(110203, 'PQ. SANTA ROSA ', 1102),
(110204, 'PQ. UNION', 1102),
(110205, 'PQ. EL CUJI', 1102),
(110206, 'PQ. TAMACA ', 1102),
(110207, 'PQ. JUAN DE VILLEGAS ', 1102),
(110208, 'PQ. AGUEDO F. ALVARADO ', 1102),
(110209, 'PQ. BUENA VISTA', 1102),
(110210, 'PQ. JUAREZ ', 1102),
(110301, 'PQ. JUAN B RODRIGUEZ ', 1103),
(110302, 'PQ. DIEGO DE LOZADA', 1103),
(110303, 'PQ. SAN MIGUEL ', 1103),
(110304, 'PQ. CUARA', 1103),
(110305, 'PQ. PARAISO DE SAN JOSE', 1103),
(110306, 'PQ. TINTORERO', 1103),
(110307, 'PQ. JOSE BERNARDO DORANTE', 1103),
(110308, 'PQ. CRNEL. MARIANO PERAZA', 1103),
(110401, 'PQ. BOLIVAR', 1104),
(110402, 'PQ. ANZOATEGUI ', 1104),
(110403, 'PQ. GUARICO', 1104),
(110404, 'PQ. HUMOCARO ALTO', 1104),
(110405, 'PQ. HUMOCARO BAJO', 1104),
(110406, 'PQ. MORAN', 1104),
(110407, 'PQ. HILARIO LUNA Y LUNA', 1104),
(110408, 'PQ. LA CANDELARIA', 1104),
(110501, 'PQ. CABUDARE ', 1105),
(110502, 'PQ. JOSE G. BASTIDAS ', 1105),
(110503, 'PQ. AGUA VIVA', 1105),
(110601, 'PQ. TRINIDAD SAMUEL', 1106),
(110602, 'PQ. ANTONIO DIAZ ', 1106),
(110603, 'PQ. CAMACARO ', 1106),
(110604, 'PQ. CASTAÑEDA', 1106),
(110605, 'PQ. CHIQUINQUIRA ', 1106),
(110606, 'PQ. ESPINOZA LOS MONTEROS', 1106),
(110607, 'PQ. LARA ', 1106),
(110608, 'PQ. MANUEL MORILLO ', 1106),
(110609, 'PQ. MONTES DE OCA', 1106),
(110610, 'PQ. TORRES ', 1106),
(110611, 'PQ. EL BLANCO', 1106),
(110612, 'PQ. MONTA A VERDE', 1106),
(110613, 'PQ. HERIBERTO ARROYO ', 1106),
(110614, 'PQ. LAS MERCEDES ', 1106),
(110615, 'PQ. CECILIO ZUBILLAGA', 1106),
(110616, 'PQ. REYES VARGAS ', 1106),
(110617, 'PQ. ALTAGRACIA ', 1106),
(110701, 'PQ. SIQUISIQUE ', 1107),
(110702, 'PQ. SAN MIGUEL ', 1107),
(110703, 'PQ. XAGUAS ', 1107),
(110704, 'PQ. MOROTURO ', 1107),
(110801, 'PQ. PIO TAMAYO ', 1108),
(110802, 'PQ. YACAMBU', 1108),
(110803, 'PQ. QBDA. HONDA DE GUACHE', 1108),
(110901, 'PQ. SARARE ', 1109),
(110902, 'PQ. GUSTAVO VEGAS LEON ', 1109),
(110903, 'PQ. BURIA', 1109),
(120101, 'PQ. GABRIEL PICON G. ', 1201),
(120102, 'PQ. HECTOR AMABLE MORA ', 1201),
(120103, 'PQ. JOSE NUCETE SARDI', 1201),
(120104, 'PQ. PULIDO MENDEZ', 1201),
(120105, 'PQ. PTE. ROMULO GALLEGOS ', 1201),
(120106, 'PQ. PRESIDENTE BETANCOURT', 1201),
(120107, 'PQ. PRESIDENTE PAEZ', 1201),
(120201, 'CM. LA AZULITA ', 1202),
(120301, 'CM. CANAGUA', 1203),
(120302, 'PQ. CAPURI ', 1203),
(120303, 'PQ. CHACANTA ', 1203),
(120304, 'PQ. EL MOLINO', 1203),
(120305, 'PQ. GUAIMARAL', 1203),
(120306, 'PQ. MUCUTUY', 1203),
(120307, 'PQ. MUCUCHACHI ', 1203),
(120401, 'PQ. ACEQUIAS ', 1204),
(120402, 'PQ. JAJI ', 1204),
(120403, 'PQ. LA MESA', 1204),
(120404, 'PQ. SAN JOSE ', 1204),
(120405, 'PQ. MONTALBAN', 1204),
(120406, 'PQ. MATRIZ ', 1204),
(120407, 'PQ. FERNANDEZ PEÑA ', 1204),
(120501, 'CM. GUARAQUE ', 1205),
(120502, 'PQ. MESA DE QUINTERO ', 1205),
(120503, 'PQ. RIO NEGRO', 1205),
(120601, 'CM. ARAPUEY', 1206),
(120602, 'PQ. PALMIRA', 1206),
(120701, 'CM. TORONDOY ', 1207),
(120702, 'PQ. SAN CRISTOBAL DE T ', 1207),
(120801, 'PQ. ARIAS', 1208),
(120802, 'PQ. SAGRARIO ', 1208),
(120803, 'PQ. MILLA', 1208),
(120804, 'PQ. EL LLANO ', 1208),
(120805, 'PQ. JUAN RODRIGUEZ SUAREZ', 1208),
(120806, 'PQ. JACINTO PLAZA', 1208),
(120807, 'PQ. DOMINGO PEÑA ', 1208),
(120808, 'PQ. GONZALO PICON FEBRES ', 1208),
(120809, 'PQ. OSUNA RODRIGUEZ', 1208),
(120810, 'PQ. LASSO DE LA VEGA ', 1208),
(120811, 'PQ. CARACCIOLO PARRA P ', 1208),
(120812, 'PQ. MARIANO PICON SALAS', 1208),
(120813, 'PQ. ANTONIO SPINETTI DINI', 1208),
(120814, 'PQ. EL MORRO ', 1208),
(120815, 'PQ. LOS NEVADOS', 1208),
(120901, 'CM. TABAY', 1209),
(121001, 'CM. TIMOTES', 1210),
(121002, 'PQ. ANDRES ELOY BLANCO ', 1210),
(121003, 'PQ. PIÑANGO', 1210),
(121004, 'PQ. LA VENTA ', 1210),
(121101, 'CM. STA CRUZ DE MORA ', 1211),
(121102, 'PQ. MESA BOLIVAR ', 1211),
(121103, 'PQ. MESA DE LAS PALMAS ', 1211),
(121201, 'CM. STA ELENA DE ARENALES', 1212),
(121202, 'PQ. ELOY PAREDES ', 1212),
(121203, 'PQ. PQ R DE ALCAZAR', 1212),
(121301, 'CM. TUCANI ', 1213),
(121302, 'PQ. FLORENCIO RAMIREZ', 1213),
(121401, 'CM. SANTO DOMINGO', 1214),
(121402, 'PQ. LAS PIEDRAS', 1214),
(121501, 'CM. PUEBLO LLANO ', 1215),
(121601, 'CM. MUCUCHIES', 1216),
(121602, 'PQ. MUCURUBA ', 1216),
(121603, 'PQ. SAN RAFAEL ', 1216),
(121604, 'PQ. CACUTE ', 1216),
(121605, 'PQ. LA TOMA', 1216),
(121701, 'CM. BAILADORES ', 1217),
(121702, 'PQ. GERONIMO MALDONADO ', 1217),
(121801, 'CM. LAGUNILLAS ', 1218),
(121802, 'PQ. CHIGUARA ', 1218),
(121803, 'PQ. ESTANQUES', 1218),
(121804, 'PQ. SAN JUAN ', 1218),
(121805, 'PQ. PUEBLO NUEVO DEL SUR ', 1218),
(121806, 'PQ. LA TRAMPA', 1218),
(121901, 'PQ. EL LLANO ', 1219),
(121902, 'PQ. TOVAR', 1219),
(121903, 'PQ. EL AMPARO', 1219),
(121904, 'PQ. SAN FRANCISCO', 1219),
(122001, 'CM. NUEVA BOLIVIA', 1220),
(122002, 'PQ. INDEPENDENCIA', 1220),
(122003, 'PQ. MARIA C PALACIOS ', 1220),
(122004, 'PQ. SANTA APOLONIA ', 1220),
(122101, 'CM. STA MARIA DE CAPARO', 1221),
(122201, 'CM. ARICAGUA ', 1222),
(122202, 'PQ. SAN ANTONIO', 1222),
(122301, 'CM. ZEA', 1223),
(122302, 'PQ. CAÑO EL TIGRE', 1223),
(130101, 'PQ. CAUCAGUA ', 1301),
(130102, 'PQ. ARAGUITA ', 1301),
(130103, 'PQ. AREVALO GONZALEZ ', 1301),
(130104, 'PQ. CAPAYA ', 1301),
(130105, 'PQ. PANAQUIRE', 1301),
(130106, 'PQ. RIBAS', 1301),
(130107, 'PQ. EL CAFE', 1301),
(130108, 'PQ. MARIZAPA ', 1301),
(130201, 'PQ. HIGUEROTE', 1302),
(130202, 'PQ. CURIEPE', 1302),
(130203, 'PQ. TACARIGUA', 1302),
(130301, 'PQ. LOS TEQUES ', 1303),
(130302, 'PQ. CECILIO ACOSTA ', 1303),
(130303, 'PQ. PARACOTOS', 1303),
(130304, 'PQ. SAN PEDRO', 1303),
(130305, 'PQ. TACATA ', 1303),
(130306, 'PQ. EL JARILLO ', 1303),
(130307, 'PQ. ALTAGRACIA DE LA M ', 1303),
(130401, 'PQ. STA TERESA DEL TUY ', 1304),
(130402, 'PQ. EL CARTANAL', 1304),
(130501, 'PQ. OCUMARE DEL TUY', 1305),
(130502, 'PQ. LA DEMOCRACIA', 1305),
(130503, 'PQ. SANTA BARBARA', 1305),
(130601, 'PQ. RIO CHICO', 1306),
(130602, 'PQ. EL GUAPO ', 1306),
(130603, 'PQ.TACARIGUA DE LA LAGUNA', 1306),
(130604, 'PQ. PAPARO ', 1306),
(130605, 'PQ. SN FERNANDO DEL GUAPO', 1306),
(130701, 'PQ. SANTA LUCIA', 1307),
(130801, 'PQ. GUARENAS ', 1308),
(130901, 'PQ. PETARE ', 1309),
(130902, 'PQ. LEONCIO MARTINEZ ', 1309),
(130903, 'PQ. CAUCAGUITA ', 1309),
(130904, 'PQ. FILAS DE MARICHES', 1309),
(130905, 'PQ. LA DOLORITA', 1309),
(131001, 'PQ. CUA', 1310),
(131002, 'PQ. NUEVA CUA', 1310),
(131101, 'PQ. GUATIRE', 1311),
(131102, 'PQ. BOLIVAR', 1311),
(131201, 'PQ. CHARALLAVE ', 1312),
(131202, 'PQ. LAS BRISAS ', 1312),
(131301, 'PQ. SAN ANTONIO LOS ALTOS', 1313),
(131401, 'PQ.SAN JOSE DE BARLOVENTO', 1314),
(131402, 'PQ. CUMBO', 1314),
(131501, 'PQ. SAN FCO DE YARE', 1315),
(131502, 'PQ. S ANTONIO DE YARE', 1315),
(131601, 'PQ. BARUTA ', 1316),
(131602, 'PQ. EL CAFETAL ', 1316),
(131603, 'PQ. LAS MINAS DE BARUTA', 1316),
(131701, 'PQ. CARRIZAL ', 1317),
(131801, 'PQ. CHACAO ', 1318),
(131901, 'PQ. EL HATILLO ', 1319),
(132001, 'PQ. MAMPORAL ', 1320),
(132101, 'PQ. CUPIRA ', 1321),
(132102, 'PQ. MACHURUCUTO', 1321),
(140101, 'CM. SAN ANTONIO', 1401),
(140102, 'PQ. SAN FRANCISCO', 1401),
(140201, 'CM. CARIPITO ', 1402),
(140301, 'CM. CARIPE ', 1403),
(140302, 'PQ. TERESEN', 1403),
(140303, 'PQ. EL GUACHARO', 1403),
(140304, 'PQ. SAN AGUSTIN', 1403),
(140305, 'PQ. LA GUANOTA ', 1403),
(140306, 'PQ. SABANA DE PIEDRA ', 1403),
(140401, 'CM. CAICARA', 1404),
(140402, 'PQ. AREO ', 1404),
(140403, 'PQ. SAN FELIX', 1404),
(140404, 'PQ. VIENTO FRESCO', 1404),
(140501, 'CM. PUNTA DE MATA', 1405),
(140502, 'PQ. EL TEJERO', 1405),
(140601, 'CM. TEMBLADOR', 1406),
(140602, 'PQ. TABASCA', 1406),
(140603, 'PQ. LAS ALHUACAS ', 1406),
(140604, 'PQ. CHAGUARAMAS', 1406),
(140701, 'PQ. EL FURRIAL ', 1407),
(140702, 'PQ. JUSEPIN', 1407),
(140703, 'PQ. EL COROZO', 1407),
(140704, 'PQ. SAN VICENTE', 1407),
(140705, 'PQ. LA PICA', 1407),
(140706, 'PQ. ALTO DE LOS GODOS', 1407),
(140707, 'PQ. BOQUERON ', 1407),
(140708, 'PQ. LAS COCUIZAS ', 1407),
(140709, 'PQ. SANTA CRUZ ', 1407),
(140710, 'PQ. SAN SIMON', 1407),
(140801, 'CM. ARAGUA ', 1408),
(140802, 'PQ. CHAGUARAMAL', 1408),
(140803, 'PQ. GUANAGUANA ', 1408),
(140804, 'PQ. APARICIO ', 1408),
(140805, 'PQ. TAGUAYA', 1408),
(140806, 'PQ. EL PINTO ', 1408),
(140807, 'PQ. LA TOSCANA ', 1408),
(140901, 'CM. QUIRIQUIRE ', 1409),
(140902, 'PQ. CACHIPO', 1409),
(141001, 'CM. BARRANCAS', 1410),
(141002, 'LOS BARRANCOS DE FAJARDO ', 1410),
(141101, 'CM. AGUASAY', 1411),
(141201, 'CM. SANTA BARBARA', 1412),
(141301, 'CM. URACOA ', 1413),
(150101, 'CM. LA ASUNCION', 1501),
(150201, 'CM. SAN JUAN BAUTISTA', 1502),
(150202, 'PQ. ZABALA ', 1502),
(150301, 'CM. SANTA ANA', 1503),
(150302, 'PQ. GUEVARA', 1503),
(150303, 'PQ. MATASIETE', 1503),
(150304, 'PQ. BOLIVAR', 1503),
(150305, 'PQ. SUCRE', 1503),
(150401, 'CM. PAMPATAR ', 1504),
(150402, 'PQ. AGUIRRE', 1504),
(150501, 'CM. JUAN GRIEGO', 1505),
(150502, 'PQ. ADRIAN ', 1505),
(150601, 'CM. PORLAMAR ', 1506),
(150701, 'CM. BOCA DEL RIO ', 1507),
(150702, 'PQ. SAN FRANCISCO', 1507),
(150801, 'CM. SAN PEDRO DE COCHE ', 1508),
(150802, 'PQ. VICENTE FUENTES', 1508),
(150901, 'CM. PUNTA DE PIEDRAS ', 1509),
(150902, 'PQ. LOS BARALES', 1509),
(151001, 'CM.LA PLAZA DE PARAGUACHI', 1510),
(151101, 'CM. VALLE ESP SANTO', 1511),
(151102, 'PQ. FRANCISCO FAJARDO', 1511),
(160101, 'CM. ARAURE ', 1601),
(160102, 'PQ. RIO ACARIGUA ', 1601),
(160201, 'CM. PIRITU ', 1602),
(160202, 'PQ. UVERAL ', 1602),
(160301, 'CM. GUANARE', 1603),
(160302, 'PQ. CORDOBA', 1603),
(160303, 'PQ.SAN JUAN GUANAGUANARE ', 1603),
(160304, 'PQ. VIRGEN DE LA COROMOTO', 1603),
(160305, 'PQ.SAN JOSE DE LA MONTAÑA', 1603),
(160401, 'CM. GUANARITO', 1604),
(160402, 'PQ.TRINIDAD DE LA CAPILLA', 1604),
(160403, 'PQ. DIVINA PASTORA ', 1604),
(160501, 'CM. OSPINO ', 1605),
(160502, 'PQ. APARICION', 1605),
(160503, 'PQ. LA ESTACION', 1605),
(160601, 'CM. ACARIGUA ', 1606),
(160602, 'PQ. PAYARA ', 1606),
(160603, 'PQ. PIMPINELA', 1606),
(160604, 'PQ. RAMON PERAZA ', 1606),
(160701, 'CM. BISCUCUY ', 1607),
(160702, 'PQ. CONCEPCION ', 1607),
(160703, 'PQ.SAN RAFAEL PALO ALZADO', 1607),
(160704, 'PQ. UVENCIO A VELASQUEZ', 1607),
(160705, 'PQ. SAN JOSE DE SAGUAZ ', 1607),
(160706, 'PQ. VILLA ROSA ', 1607),
(160801, 'CM. VILLA BRUZUAL', 1608),
(160802, 'PQ. CANELONES', 1608),
(160803, 'PQ. SANTA CRUZ ', 1608),
(160804, 'PQ. SAN ISIDRO LABRADOR', 1608),
(160901, 'CM. CHABASQUEN ', 1609),
(160902, 'PQ. PEÑA BLANCA', 1609),
(161001, 'CM. AGUA BLANCA', 1610),
(161101, 'CM. PAPELON', 1611),
(161102, 'PQ. CAÑO DELGADITO ', 1611),
(161201, 'CM. BOCONOITO', 1612),
(161202, 'PQ. ANTOLIN TOVAR AQUINO ', 1612),
(161301, 'CM. SAN RAFAEL DE ONOTO', 1613),
(161302, 'PQ. SANTA FE ', 1613),
(161303, 'PQ. THERMO MORLES', 1613),
(161401, 'CM. EL PLAYON', 1614),
(161402, 'PQ. FLORIDA', 1614),
(170101, 'PQ. RIO CARIBE ', 1701),
(170102, 'PQ. SAN JUAN GALDONAS', 1701),
(170103, 'PQ. PUERTO SANTO ', 1701),
(170104, 'PQ. EL MORRO DE PTO SANTO', 1701),
(170105, 'PQ. ANTONIO JOSE DE SUCRE', 1701),
(170201, 'PQ. EL PILAR ', 1702),
(170202, 'PQ. EL RINCON', 1702),
(170203, 'PQ. GUARAUNOS', 1702),
(170204, 'PQ. TUNAPUICITO', 1702),
(170205, 'PQ. UNION', 1702),
(170206, 'PQ. GRAL FCO. A VASQUEZ', 1702),
(170301, 'PQ. SANTA CATALINA ', 1703),
(170302, 'PQ. SANTA ROSA ', 1703),
(170303, 'PQ. SANTA TERESA ', 1703),
(170304, 'PQ. BOLIVAR', 1703),
(170305, 'PQ. MACARAPANA ', 1703),
(170401, 'PQ. YAGUARAPARO', 1704),
(170402, 'PQ. LIBERTAD ', 1704),
(170403, 'PQ. PAUJIL ', 1704),
(170501, 'PQ. IRAPA', 1705),
(170502, 'PQ. CAMPO CLARO', 1705),
(170503, 'PQ. SORO ', 1705),
(170504, 'PQ. SAN ANTONIO DE IRAPA ', 1705),
(170505, 'PQ. MARABAL', 1705),
(170601, 'CM. SAN ANT DEL GOLFO', 1706),
(170701, 'PQ. CUMANACOA', 1707),
(170702, 'PQ. ARENAS ', 1707),
(170703, 'PQ. ARICAGUA ', 1707),
(170704, 'PQ. COCOLLAR ', 1707),
(170705, 'PQ. SAN FERNANDO ', 1707),
(170706, 'PQ. SAN LORENZO', 1707),
(170801, 'PQ. CARIACO', 1708),
(170802, 'PQ. CATUARO', 1708),
(170803, 'PQ. RENDON ', 1708),
(170804, 'PQ. SANTA CRUZ ', 1708),
(170805, 'PQ. SANTA MARIA', 1708),
(170901, 'PQ. ALTAGRACIA ', 1709),
(170902, 'PQ. AYACUCHO ', 1709),
(170903, 'PQ. SANTA INES ', 1709),
(170904, 'PQ. VALENTIN VALIENTE', 1709),
(170905, 'PQ. SAN JUAN ', 1709),
(170906, 'PQ.GRAN MARISCAL ', 1709),
(170907, 'PQ. RAUL LEONI ', 1709),
(171001, 'PQ. GUIRIA ', 1710),
(171002, 'PQ. CRISTOBAL COLON', 1710),
(171003, 'PQ. PUNTA DE PIEDRA', 1710),
(171004, 'PQ. BIDEAU ', 1710),
(171101, 'PQ. MARIÑO ', 1711),
(171102, 'PQ. ROMULO GALLEGOS', 1711),
(171201, 'PQ. TUNAPUY', 1712),
(171202, 'PQ. CAMPO ELIAS', 1712),
(171301, 'PQ. SAN JOSE DE AREOCUAR ', 1713),
(171302, 'PQ. TAVERA ACOSTA', 1713),
(171401, 'CM. MARIGUITAR ', 1714),
(171501, 'PQ. ARAYA', 1715),
(171502, 'PQ. MANICUARE', 1715),
(171503, 'PQ. CHACOPATA', 1715),
(180101, 'CM. COLON', 1801),
(180102, 'PQ. RIVAS BERTI', 1801),
(180103, 'PQ. SAN PEDRO DEL RIO', 1801),
(180201, 'CM. SAN ANT DEL TACHIRA', 1802),
(180202, 'PQ. PALOTAL', 1802),
(180203, 'PQ. JUAN VICENTE GOMEZ ', 1802),
(180204, 'PQ. ISAIAS MEDINA ANGARIT', 1802),
(180301, 'CM. CAPACHO NUEVO', 1803),
(180302, 'PQ. JUAN GERMAN ROSCIO ', 1803),
(180303, 'PQ. ROMAN CARDENAS ', 1803),
(180401, 'CM. TARIBA ', 1804),
(180402, 'PQ. LA FLORIDA ', 1804),
(180403, 'PQ. AMENODORO RANGEL LAMU', 1804),
(180501, 'CM. LA GRITA ', 1805),
(180502, 'PQ. EMILIO C. GUERRERO ', 1805),
(180503, 'PQ. MONS. MIGUEL A SALAS ', 1805),
(180601, 'CM. RUBIO', 1806),
(180602, 'PQ. BRAMON ', 1806),
(180603, 'PQ. LA PETROLEA', 1806),
(180604, 'PQ. QUINIMARI', 1806),
(180701, 'CM. LOBATERA ', 1807),
(180702, 'PQ. CONSTITUCION ', 1807),
(180801, 'PQ. LA CONCORDIA ', 1808),
(180802, 'PQ. PEDRO MARIA MORANTES ', 1808),
(180803, 'PQ. SN JUAN BAUTISTA ', 1808),
(180804, 'PQ. SAN SEBASTIAN', 1808),
(180805, 'PQ. DR. FCO. ROMERO LOBO ', 1808),
(180901, 'CM. PREGONERO', 1809),
(180902, 'PQ. CARDENAS ', 1809),
(180903, 'PQ. POTOSI ', 1809),
(180904, 'PQ. JUAN PABLO PEÑALOZA', 1809),
(181001, 'CM. STA. ANADEL TACHIRA', 1810),
(181101, 'CM. LA FRIA', 1811),
(181102, 'PQ. BOCA DE GRITA', 1811),
(181103, 'PQ. JOSE ANTONIO PAEZ', 1811),
(181201, 'CM. PALMIRA', 1812),
(181301, 'CM. MICHELENA', 1813),
(181401, 'CM. ABEJALES ', 1814),
(181402, 'PQ. SAN JOAQUIN DE NAVAY ', 1814),
(181403, 'PQ. DORADAS', 1814),
(181404, 'PQ. EMETERIO OCHOA ', 1814),
(181501, 'CM. COLONCITO', 1815),
(181502, 'PQ. LA PALMITA ', 1815),
(181601, 'CM. UREÑA', 1816),
(181602, 'PQ. NUEVA ARCADIA', 1816),
(181701, 'CM. QUENIQUEA', 1817),
(181702, 'PQ. SAN PABLO', 1817),
(181703, 'PQ.ELEAZAR LOPEZ CONTRERA', 1817),
(181801, 'CM. CORDERO', 1818),
(181901, 'CM.SAN RAFAEL DEL PINAL', 1819),
(181902, 'PQ. SANTO DOMINGO', 1819),
(181903, 'PQ. ALBERTO ADRIANI', 1819),
(182001, 'CM. CAPACHO VIEJO', 1820),
(182002, 'PQ. CIPRIANO CASTRO', 1820),
(182003, 'PQ. MANUEL FELIPE RUGELES', 1820),
(182101, 'CM. LA TENDIDA ', 1821),
(182102, 'PQ. BOCONO ', 1821),
(182103, 'PQ. HERNANDEZ', 1821),
(182201, 'CM. SEBORUCO ', 1822),
(182301, 'CM. LAS MESAS', 1823),
(182401, 'CM. SAN JOSE DE BOLIVAR', 1824),
(182501, 'CM. EL COBRE ', 1825),
(182601, 'CM. DELICIAS ', 1826),
(182701, 'CM. SAN SIMON', 1827),
(182801, 'CM. SAN JOSECITO ', 1828),
(182901, 'CM. UMUQUENA ', 1829),
(190101, 'PQ. BETIJOQUE', 1901),
(190102, 'PQ. JOSE G HERNANDEZ ', 1901),
(190103, 'PQ. LA PUEBLITA', 1901),
(190104, 'PQ. EL CEDRO ', 1901),
(190201, 'PQ. BOCONO ', 1902),
(190202, 'PQ. EL CARMEN', 1902),
(190203, 'PQ. MOSQUEY', 1902),
(190204, 'PQ. AYACUCHO ', 1902),
(190205, 'PQ. BURBUSAY ', 1902),
(190206, 'PQ. GENERAL RIVAS', 1902),
(190207, 'PQ. MONSEÑOR JAUREGUI', 1902),
(190208, 'PQ. RAFAEL RANGEL', 1902),
(190209, 'PQ. SAN JOSE ', 1902),
(190210, 'PQ. SAN MIGUEL ', 1902),
(190211, 'PQ. GUARAMACAL ', 1902),
(190212, 'PQ. LA VEGA DE GUARAMACAL', 1902),
(190301, 'PQ. CARACHE', 1903),
(190302, 'PQ. LA CONCEPCION', 1903),
(190303, 'PQ. CUICAS ', 1903),
(190304, 'PQ. PANAMERICANA ', 1903),
(190305, 'PQ. SANTA CRUZ ', 1903),
(190401, 'PQ. ESCUQUE', 1904),
(190402, 'PQ. SABANA LIBRE ', 1904),
(190403, 'PQ. LA UNION ', 1904),
(190404, 'PQ. SANTA RITA ', 1904),
(190501, 'PQ. CRISTOBAL MENDOZA', 1905),
(190502, 'PQ. CHIQUINQUIRA ', 1905),
(190503, 'PQ. MATRIZ ', 1905),
(190504, 'PQ. MONSEÑOR CARRILLO', 1905),
(190505, 'PQ. CRUZ CARRILLO', 1905),
(190506, 'PQ. ANDRES LINARES ', 1905),
(190507, 'PQ. TRES ESQUINAS', 1905),
(190601, 'PQ. LA QUEBRADA', 1906),
(190602, 'PQ. JAJO ', 1906),
(190603, 'PQ. LA MESA', 1906),
(190604, 'PQ. SANTIAGO ', 1906),
(190605, 'PQ. CABIMBU', 1906),
(190606, 'PQ. TUÑAME ', 1906),
(190701, 'PQ. MERCEDES DIAZ', 1907),
(190702, 'PQ. JUAN IGNACIO MONTILLA', 1907),
(190703, 'PQ. LA BEATRIZ ', 1907),
(190704, 'PQ. MENDOZA', 1907),
(190705, 'PQ. LA PUERTA', 1907),
(190706, 'PQ. SAN LUIS ', 1907),
(190801, 'PQ. CHEJENDE ', 1908),
(190802, 'PQ. CARRILLO ', 1908),
(190803, 'PQ. CEGARRA', 1908),
(190804, 'PQ. BOLIVIA', 1908),
(190805, 'PQ. MANUEL SALVADOR ULLOA', 1908),
(190806, 'PQ. SAN JOSE ', 1908),
(190807, 'PQ. ARNOLDO GABALDON ', 1908),
(190901, 'PQ. EL DIVIDIVE', 1909),
(190902, 'PQ. AGUA CALIENTE', 1909),
(190903, 'PQ. EL CENIZO', 1909),
(190904, 'PQ. AGUA SANTA ', 1909),
(190905, 'PQ. VALERITA ', 1909),
(191001, 'PQ. MONTE CARMELO', 1910),
(191002, 'PQ. BUENA VISTA', 1910),
(191003, 'PQ. STA MARIA DEL HORCON ', 1910),
(191101, 'PQ. MOTATAN', 1911),
(191102, 'PQ. EL BAÑO', 1911),
(191103, 'PQ. JALISCO', 1911),
(191201, 'PQ. PAMPAN ', 1912),
(191202, 'PQ. SANTA ANA', 1912),
(191203, 'PQ. LA PAZ ', 1912),
(191204, 'PQ. FLOR DE PATRIA ', 1912),
(191301, 'PQ. CARVAJAL ', 1913),
(191302, 'PQ. ANTONIO N BRICEÑO', 1913),
(191303, 'PQ. CAMPO ALEGRE ', 1913),
(191304, 'PQ. JOSE LEONARDO SUAREZ ', 1913),
(191401, 'PQ. SABANA DE MENDOZA', 1914),
(191402, 'PQ. JUNIN', 1914),
(191403, 'PQ. VALMORE RODRIGUEZ', 1914),
(191404, 'PQ. EL PARAISO ', 1914),
(191501, 'PQ. SANTA ISABEL ', 1915),
(191502, 'PQ. ARAGUANEY', 1915),
(191503, 'PQ. EL JAGUITO ', 1915),
(191504, 'PQ. LA ESPERANZA ', 1915),
(191601, 'PQ. SABANA GRANDE', 1916),
(191602, 'PQ. CHEREGUE ', 1916),
(191603, 'PQ. GRANADOS ', 1916),
(191701, 'PQ. EL SOCORRO ', 1917),
(191702, 'PQ. LOS CAPRICHOS', 1917),
(191703, 'PQ. ANTONIO JOSE DE SUCRE', 1917),
(191801, 'PQ. CAMPO ELIAS', 1918),
(191802, 'PQ. ARNOLDO GABALDON ', 1918),
(191901, 'PQ. SANTA APOLONIA ', 1919),
(191902, 'PQ. LA CEIBA ', 1919),
(191903, 'PQ. EL PROGRESO', 1919),
(191904, 'PQ. TRES DE FEBRERO', 1919),
(192001, 'PQ. PAMPANITO', 1920),
(192002, 'PQ. PAMPANITO II ', 1920),
(192003, 'PQ. LA CONCEPCION', 1920),
(200101, 'CM. AROA ', 2001),
(200201, 'CM. CHIVACOA ', 2002),
(200202, 'PQ. CAMPO ELIAS', 2002),
(200301, 'CM. NIRGUA ', 2003),
(200302, 'PQ. SALOM', 2003),
(200303, 'PQ. TEMERLA', 2003),
(200401, 'CM. SAN FELIPE ', 2004),
(200402, 'PQ. ALBARICO ', 2004),
(200403, 'PQ. SAN JAVIER ', 2004),
(200501, 'CM. GUAMA', 2005),
(200601, 'CM. URACHICHE', 2006),
(200701, 'CM. YARITAGUA', 2007),
(200702, 'PQ. SAN ANDRES ', 2007),
(200801, 'CM. SABANA DE PARRA', 2008),
(200901, 'CM. BORAURE', 2009),
(201001, 'CM. COCOROTE ', 2010),
(201101, 'CM. INDEPENDENCIA', 2011),
(201201, 'CM. SAN PABLO', 2012),
(201301, 'CM. YUMARE ', 2013),
(201401, 'CM. FARRIAR', 2014),
(201402, 'PQ. EL GUAYABO ', 2014),
(210101, 'PQ. GENERAL URDANETA ', 2101),
(210102, 'PQ. LIBERTADOR ', 2101),
(210103, 'PQ. MANUEL GUANIPA MATOS ', 2101),
(210104, 'PQ. MARCELINO BRICEÑO', 2101),
(210105, 'PQ. SAN TIMOTEO', 2101),
(210106, 'PQ. PUEBLO NUEVO ', 2101),
(210201, 'PQ. PEDRO LUCAS URRIBARRI', 2102),
(210202, 'PQ. SANTA RITA ', 2102),
(210203, 'PQ. JOSE CENOVIO URRIBARR', 2102),
(210204, 'PQ. EL MENE', 2102),
(210301, 'PQ. SANTA CRUZ DEL ZULIA ', 2103),
(210302, 'PQ. URRIBARRI', 2103),
(210303, 'PQ. MORALITO ', 2103),
(210304, 'PQ. SAN CARLOS DEL ZULIA ', 2103),
(210305, 'PQ. SANTA BARBARA', 2103),
(210401, 'PQ. LUIS DE VICENTE', 2104),
(210402, 'PQ. RICAURTE ', 2104),
(210403, 'PQ. MONS.MARCOS SERGIO G ', 2104),
(210404, 'PQ. SAN RAFAEL ', 2104),
(210405, 'PQ. LAS PARCELAS ', 2104),
(210406, 'PQ. TAMARE ', 2104),
(210407, 'PQ. LA SIERRITA', 2104),
(210501, 'PQ. BOLIVAR', 2105),
(210502, 'PQ. COQUIVACOA ', 2105),
(210503, 'PQ. CRISTO DE ARANZA ', 2105),
(210504, 'PQ. CHIQUINQUIRA ', 2105),
(210505, 'PQ. SANTA LUCIA', 2105),
(210506, 'PQ. OLEGARIO VILLALOBOS', 2105),
(210507, 'PQ. JUANA DE AVILA ', 2105),
(210508, 'PQ.CARACCIOLO PARRA PEREZ', 2105),
(210509, 'PQ. IDELFONZO VASQUEZ', 2105),
(210510, 'PQ. CACIQUE MARA ', 2105),
(210511, 'PQ. CECILIO ACOSTA ', 2105),
(210512, 'PQ. RAUL LEONI ', 2105),
(210513, 'PQ. FRANCISCO EUGENIO B', 2105),
(210514, 'PQ. MANUEL DAGNINO ', 2105),
(210515, 'PQ. LUIS HURTADO HIGUERA ', 2105),
(210516, 'PQ. VENANCIO PULGAR', 2105),
(210517, 'PQ. ANTONIO BORJAS ROMERO', 2105),
(210518, 'PQ. SAN ISIDRO ', 2105),
(210601, 'PQ. FARIA', 2106),
(210602, 'PQ. SAN ANTONIO', 2106),
(210603, 'PQ. ANA MARIA CAMPOS ', 2106),
(210604, 'PQ. SAN JOSE ', 2106),
(210605, 'PQ. ALTAGRACIA ', 2106),
(210701, 'PQ. GOAJIRA', 2107),
(210702, 'PQ. ELIAS SANCHEZ RUBIO', 2107),
(210703, 'PQ. SINAMAICA', 2107),
(210704, 'PQ. ALTA GUAJIRA ', 2107),
(210801, 'PQ. SAN JOSE DE PERIJA ', 2108),
(210802, 'PQ.BARTOLOME DE LAS CASAS', 2108),
(210803, 'PQ. LIBERTAD ', 2108),
(210804, 'PQ. RIO NEGRO', 2108),
(210901, 'PQ. GIBRALTAR', 2109),
(210902, 'PQ. HERAS', 2109),
(210903, 'PQ. M.ARTURO CELESTINO A ', 2109),
(210904, 'PQ. ROMULO GALLEGOS', 2109),
(210905, 'PQ. BOBURES', 2109),
(210906, 'PQ. EL BATEY ', 2109),
(211001, 'PQ. ANDRES BELLO (KM 48) ', 2110),
(211002, 'PQ. POTRERITOS ', 2110),
(211003, 'PQ. EL CARMELO ', 2110),
(211004, 'PQ. CHIQUINQUIRA ', 2110),
(211005, 'PQ. CONCEPCION ', 2110),
(211101, 'PQ. ELEAZAR LOPEZ C', 2111),
(211102, 'PQ. ALONSO DE OJEDA', 2111),
(211103, 'PQ. VENEZUELA', 2111),
(211104, 'PQ. CAMPO LARA ', 2111),
(211105, 'PQ. LIBERTAD ', 2111),
(211201, 'PQ. UDON PEREZ ', 2112),
(211202, 'PQ. ENCONTRADOS', 2112),
(211301, 'PQ. DONALDO GARCIA ', 2113),
(211302, 'PQ. SIXTO ZAMBRANO ', 2113),
(211303, 'PQ. EL ROSARIO ', 2113),
(211401, 'PQ. AMBROSIO ', 2114),
(211402, 'PQ. GERMAN RIOS LINARES', 2114),
(211403, 'PQ. JORGE HERNANDEZ', 2114),
(211404, 'PQ. LA ROSA', 2114),
(211405, 'PQ. PUNTA GORDA', 2114),
(211406, 'PQ. CARMEN HERRERA ', 2114),
(211407, 'PQ. SAN BENITO ', 2114),
(211408, 'PQ. ROMULO BETANCOURT', 2114),
(211409, 'PQ. ARISTIDES CALVANI', 2114),
(211501, 'PQ. RAUL CUENCA', 2115),
(211502, 'PQ. LA VICTORIA', 2115),
(211503, 'PQ. RAFAEL URDANETA', 2115),
(211601, 'PQ. JOSE RAMON YEPEZ ', 2116),
(211602, 'PQ. LA CONCEPCION', 2116),
(211603, 'PQ. SAN JOSE ', 2116),
(211604, 'PQ. MARIANO PARRA LEON ', 2116),
(211701, 'PQ. MONAGAS', 2117),
(211702, 'PQ. ISLA DE TOAS ', 2117),
(211801, 'PQ. MARCIAL HERNANDEZ', 2118),
(211802, 'PQ. FRANCISCO OCHOA', 2118),
(211803, 'PQ. SAN FRANCISCO', 2118),
(211804, 'PQ. EL BAJO', 2118),
(211805, 'PQ. DOMITILA FLORES', 2118),
(211806, 'PQ. LOS CORTIJOS ', 2118),
(211901, 'PQ. BARI ', 2119),
(211902, 'PQ. JESUS M SEMPRUN', 2119),
(212001, 'PQ. SIMON RODRIGUEZ', 2120),
(212002, 'PQ. CARLOS QUEVEDO ', 2120),
(212003, 'PQ. FRANCISCO J PULGAR ', 2120),
(212101, 'PQ. RAFAEL MARIA BARALT', 2121),
(212102, 'PQ. MANUEL MANRIQUE', 2121),
(212103, 'PQ. RAFAEL URDANETA', 2121),
(220101, 'PQ. FERNANDO GIRON TOVAR ', 2201),
(220102, 'PQ. LUIS ALBERTO GOMEZ ', 2201),
(220103, 'PQ. PARHUEÑA ', 2201),
(220104, 'PQ. PLATANILLAL', 2201),
(220201, 'CM. SAN FERNANDO DE ATABA', 2202),
(220202, 'PQ. UCATA', 2202),
(220203, 'PQ. YAPACANA ', 2202),
(220204, 'PQ. CANAME ', 2202),
(220301, 'CM. MAROA', 2203),
(220302, 'PQ. VICTORINO', 2203),
(220303, 'PQ. COMUNIDAD', 2203),
(220401, 'CM. SAN CARLOS DE RIO NEG', 2204),
(220402, 'PQ. SOLANO ', 2204),
(220403, 'PQ. CASIQUIARE ', 2204),
(220404, 'PQ. COCUY', 2204),
(220501, 'CM. ISLA DE RATON', 2205),
(220502, 'PQ. SAMARIAPO', 2205),
(220503, 'PQ. SIPAPO ', 2205),
(220504, 'PQ. MUNDUAPO ', 2205),
(220505, 'PQ. GUAYAPO', 2205),
(220601, 'CM. SAN JUAN DE MANAPIARE', 2206),
(220602, 'PQ. ALTO VENTUARI', 2206),
(220603, 'PQ. MEDIO VENTUARI ', 2206),
(220604, 'PQ. BAJO VENTUARI', 2206),
(220701, 'CM. LA ESMERALDA ', 2207),
(220702, 'PQ. HUACHAMACARE ', 2207),
(220703, 'PQ. MARAWAKA ', 2207),
(220704, 'PQ. MAVACA ', 2207),
(220705, 'PQ. SIERRA PARIMA', 2207),
(230101, 'PQ. SAN JOSE ', 2301),
(230102, 'PQ. VIRGEN DEL VALLE ', 2301),
(230103, 'PQ. SAN RAFAEL ', 2301),
(230104, 'PQ. JOSE VIDAL MARCANO ', 2301),
(230105, 'PQ. LEONARDO RUIZ PINEDA ', 2301),
(230106, 'PQ. MONS. ARGIMIRO GARCIA', 2301),
(230107, 'PQ.MCL.ANTONIO J DE SUCRE', 2301),
(230108, 'PQ. JUAN MILLAN', 2301),
(230201, 'PQ. PEDERNALES ', 2302),
(230202, 'PQ. LUIS B PRIETO FIGUERO', 2302),
(230301, 'PQ. CURIAPO', 2303),
(230302, 'PQ. SANTOS DE ABELGAS', 2303),
(230303, 'PQ. MANUEL RENAUD', 2303),
(230304, 'PQ. PADRE BARRAL ', 2303),
(230305, 'PQ. ANICETO LUGO ', 2303),
(230306, 'PQ. ALMIRANTE LUIS BRION ', 2303),
(230401, 'PQ. IMATACA', 2304),
(230402, 'PQ. ROMULO GALLEGOS', 2304),
(230403, 'PQ. JUAN BAUTISTA ARISMEN', 2304),
(230404, 'PQ. MANUEL PIAR', 2304),
(230405, 'PQ. 5 DE JULIO ', 2304),
(240101, 'PQ. CARABALLEDA', 2401),
(240102, 'PQ. CARAYACA ', 2401),
(240103, 'PQ. CARUAO ', 2401),
(240104, 'PQ. CATIA LA MAR ', 2401),
(240105, 'PQ. LA GUAIRA', 2401),
(240106, 'PQ. MACUTO ', 2401),
(240107, 'PQ. MAIQUETIA', 2401),
(240108, 'PQ. NAIGUATA ', 2401),
(240109, 'PQ. EL JUNKO ', 2401),
(240110, 'PQ. URIMARE', 2401),
(240111, 'PQ. PQ CARLOS SOUBLETTE', 2401),
(990101, 'ST. JOHN''S ', 9901),
(990201, 'RIYADH ', 9902),
(990301, 'ARGEL', 9903),
(990401, 'BUENOS AIRES ', 9904),
(990501, 'CABERRA', 9905),
(990601, 'VIENA', 9906),
(990701, 'BRIDGETOWN ', 9907),
(990801, 'BRUSELA', 9908),
(990901, 'BELMONPAN', 9909),
(991001, 'LA PAZ ', 9910),
(991101, 'BELEM DO PARA', 9911),
(991102, 'BOAVISTA ', 9911),
(991103, 'MANAOS ', 9911),
(991104, 'RIO DE JANEIRO ', 9911),
(991105, 'SAO PAOLO', 9911),
(991106, 'BRASILIA ', 9911),
(991107, 'PORTO ALEGRE ', 9911),
(991108, 'RECIFE - PERNAMBUCO', 9911),
(991201, 'SOFIA', 9912),
(991301, 'MONTREAL ', 9913),
(991302, 'TORONTO', 9913),
(991303, 'OTTAWA ', 9913),
(991401, 'CHECA', 9914),
(991501, 'SANTIAGO ', 9915),
(991601, 'HONG KONG', 9916),
(991602, 'BEIJING', 9916),
(991603, 'SHANGHAI ', 9916),
(991701, 'ARAUCA ', 9917),
(991702, 'BARRANQUILLA ', 9917),
(991703, 'BUCARAMANGA', 9917),
(991704, 'CARTAGENA', 9917),
(991705, 'CUCUTA ', 9917),
(991706, 'MEDELLIN ', 9917),
(991707, 'PUERTO CARRE O ', 9917),
(991708, 'PUERTO INIRIDA ', 9917),
(991709, 'RIOHACHA ', 9917),
(991710, 'BOGOTA ', 9917),
(991801, 'SEUL ', 9918),
(991901, 'SAN JOSE ', 9919),
(992001, 'LA HABANA', 9920),
(992002, 'JAGUEY GRANDE', 9920),
(992003, 'CAMAGUEY ', 9920),
(992004, 'ISLA DE LA JUVENTUD', 9920),
(992101, 'COPENHAGUE ', 9921),
(992201, 'ROSEAU ', 9922),
(992301, 'GUAYAQUIL', 9923),
(992302, 'QUITO', 9923),
(992401, 'EL CAIRO ', 9924),
(992501, 'SAN SALVADOR ', 9925),
(992601, 'BARCELONA', 9926),
(992602, 'BILBAO ', 9926),
(992603, 'SANTA CRUZ DE TENERIFE ', 9926),
(992604, 'VIGO ', 9926),
(992605, 'MADRID ', 9926),
(992701, 'BOSTON ', 9927),
(992702, 'CHICAGO', 9927),
(992703, 'HOUSTON', 9927),
(992704, 'MIAMI', 9927),
(992705, 'NEW ORLEANS', 9927),
(992706, 'NEW YORK ', 9927),
(992707, 'PUERTO RICO', 9927),
(992708, 'SAN FRANCISCO', 9927),
(992709, 'WASHINGTON ', 9927),
(992801, 'MOSCU', 9928),
(992901, 'MANILA ', 9929),
(993001, 'HELSINKI ', 9930),
(993101, 'MARTINICA', 9931),
(993102, 'PARIS', 9931),
(993201, 'LONDRES', 9932),
(993301, 'ATENAS ', 9933),
(993401, 'GUATEMALA', 9934),
(993501, 'GEORGETOWN ', 9935),
(993601, 'PUERTO PRINCIPE', 9936),
(993701, 'TEGUCIGALPA', 9937),
(993801, 'BUDAPEST ', 9938),
(993901, 'NUEVA DELHI', 9939),
(994001, 'JAKARTA', 9940),
(994101, 'BAGDAD ', 9941),
(994201, 'TEL AVIV ', 9942),
(994301, 'MILAN', 9943),
(994302, 'NAPOLES', 9943),
(994303, 'ROMA ', 9943),
(994401, 'KINGSTON ', 9944),
(994501, 'TOKIO', 9945),
(994601, 'NAIROBI', 9946),
(994701, 'KUWAIT ', 9947),
(994801, 'BEIRUT ', 9948),
(994901, 'TRIPOLI', 9949),
(995001, 'KUALA LUMPUR ', 9950),
(995101, 'RABAT', 9951),
(995201, 'MEXICO ', 9952),
(995301, 'WINDHOEK ', 9953),
(995401, 'MANAGUA', 9954),
(995501, 'LAGOS', 9955),
(995601, 'OSLO ', 9956),
(995701, 'ARUBA', 9957),
(995702, 'BONAIRE', 9957),
(995703, 'CURAZAO', 9957),
(995704, 'LA HAYA', 9957),
(995801, 'PANAMA ', 9958),
(995901, 'ASUNCION ', 9959),
(996001, 'LIMA ', 9960),
(996101, 'VARSOVIA ', 9961),
(996201, 'FUNCHAL MADEIRA', 9962),
(996202, 'LISBOA ', 9962),
(996301, 'SANTO DOMINGO', 9963),
(996401, 'FRANKFURT', 9964),
(996402, 'HAMBURGO ', 9964),
(996403, 'BONN ', 9964),
(996404, 'BERLIN ', 9964),
(996501, 'TEHERAN', 9965),
(996601, 'BUCAREST ', 9966),
(996701, 'BASSETERRE ', 9967),
(996801, 'KINGSTOWN', 9968),
(996901, 'CASTRIES ', 9969),
(997001, 'DAMASCO', 9970),
(997101, 'PETRORIA ', 9971),
(997201, 'ESTOCOLMO', 9972),
(997301, 'BERNA', 9973),
(997401, 'PARAMARIBO ', 9974),
(997501, 'PUERTO ESPA A', 9975),
(997601, 'ANKARA ', 9976),
(997701, 'MONTEVIDEO ', 9977),
(997801, 'ST. GEORGES', 9978),
(997901, 'CASTRIES ', 9979),
(998001, 'DOHA ', 9980),
(998101, 'PALESTINA', 9981),
(998201, 'ETIOPIA', 9982),
(998301, 'VIETNAM', 9983),
(998401, 'SINGAPUR ', 9984),
(998501, 'SENEGAL', 9985),
(998601, 'MALI ', 9986),
(998701, 'LUANDA ', 9987),
(998801, 'COTONOU', 9988),
(998901, 'BRAZAVILLE ', 9989),
(999001, 'MALABO ', 9990),
(999101, 'BANJUL ', 9991),
(999201, 'MAPUTO ', 9992),
(999301, 'JARTUM ', 9993),
(999401, 'ABU DHABI', 9994),
(999501, 'WILLEMSTAD ', 9995),
(999601, 'MINSK', 9996);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE IF NOT EXISTS `persona` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nacionalidad` char(1) NOT NULL,
  `cedula` int(8) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `fechanacimiento` date DEFAULT NULL,
  `tlf1` int(10) unsigned DEFAULT '0',
  `tlf2` int(10) unsigned DEFAULT '0',
  `sexo` char(1) DEFAULT NULL,
  `parroquia` int(7) DEFAULT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_persona_parroquia1_idx` (`parroquia`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`id`, `nacionalidad`, `cedula`, `nombre`, `apellido`, `direccion`, `correo`, `fechanacimiento`, `tlf1`, `tlf2`, `sexo`, `parroquia`, `estatus`) VALUES
(1, 'V', 19377480, 'ORIANA', 'FIGUEROA', '', 'ORIANAJFR@GMAIL.COM', '1989-04-05', 4143555629, 0, 'F', 110201, 1),
(2, 'V', 18996502, 'JHEZIR', 'CANELA', NULL, 'JHEZIR@GMAIL.COM', NULL, 0, 0, 'F', NULL, 1),
(3, 'V', 16323102, 'MARIO', 'MERLO', 'av. principal', 'MMERLO@GMAIL.COM', '0000-00-00', 4241234569, 0, 'F', 110401, 1),
(4, 'V', 15214985, 'CARLOS', 'FIGUEROA', NULL, 'ORIANAJFR@YAHOO.ES', NULL, 0, 0, 'M', NULL, 1),
(5, 'V', 13072140, 'YAJAIMI', 'FIGUEROA', NULL, NULL, NULL, 0, 0, 'F', NULL, 1),
(6, 'V', 18923923, 'CINDY', 'MUJICA', NULL, 'CINDYMUJICAS@GMAIL.COM', NULL, 0, 0, 'F', NULL, 1),
(7, 'V', 23811415, 'FREMBERLING', 'RAMOS', NULL, 'FREMBERLING@GMAIL.COM', NULL, 0, 0, 'F', NULL, 1),
(8, 'V', 4202700, 'YAJAIRA', 'RAMOS', NULL, NULL, NULL, 0, 0, 'F', NULL, 1),
(9, 'V', 4197355, 'VIVIANO', 'FIGUEROA', NULL, NULL, NULL, 0, 0, 'M', NULL, 1),
(10, 'V', 1208800, 'GILBERTO', 'ALVARADO', NULL, NULL, NULL, 0, 0, 'M', NULL, 1),
(11, 'V', 12345, 'PATRICIA', 'SOTO', 'AV.PRINCIPAL 2', 'AAA@GMAIL.COM', '1971-05-02', 4161234569, 0, NULL, 110303, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE IF NOT EXISTS `sector` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`id`, `nombre`) VALUES
(1, 'SALUD'),
(2, 'EDUCACIÓN'),
(3, 'CULTURA'),
(4, 'AMBIENTE'),
(5, 'VIALIDAD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector_tipoayuda`
--

CREATE TABLE IF NOT EXISTS `sector_tipoayuda` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `sector` tinyint(2) NOT NULL,
  `tipoayuda` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_sector_has_tipoayuda_tipoayuda1_idx` (`tipoayuda`),
  KEY `fk_sector_has_tipoayuda_sector1_idx` (`sector`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `sector_tipoayuda`
--

INSERT INTO `sector_tipoayuda` (`id`, `sector`, `tipoayuda`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 2, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitante`
--

CREATE TABLE IF NOT EXISTS `solicitante` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `usuario` int(2) NOT NULL,
  `comunidad` int(3) DEFAULT NULL,
  `persona` int(3) DEFAULT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_solicitante_usuario1_idx` (`usuario`),
  KEY `fk_solicitante_comunidad1_idx` (`comunidad`),
  KEY `fk_solicitante_persona1_idx` (`persona`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `solicitante`
--

INSERT INTO `solicitante` (`id`, `usuario`, `comunidad`, `persona`, `estatus`) VALUES
(1, 10, NULL, 9, 1),
(2, 3, NULL, 8, 1),
(3, 2, NULL, 3, 1),
(4, 12, 2, NULL, 1),
(5, 11, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE IF NOT EXISTS `tarea` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `actividad` int(3) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tarea_actividad1_idx` (`actividad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(45) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `solicitante` int(4) NOT NULL,
  `tipoticket` tinyint(2) NOT NULL,
  `sector` tinyint(2) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ticket_solicitante1_idx` (`solicitante`),
  KEY `fk_ticket_tipoticket1_idx` (`tipoticket`),
  KEY `fk_ticket_sector1_idx` (`sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket_tipoayuda`
--

CREATE TABLE IF NOT EXISTS `ticket_tipoayuda` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `ticket` int(4) NOT NULL,
  `cantidad` int(4) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `tipoayuda` tinyint(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ticket_has_sector_tipoayuda_ticket1_idx` (`ticket`),
  KEY `fk_ticket_sector_tipoayuda_tipoayuda1_idx` (`tipoayuda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoayuda`
--

CREATE TABLE IF NOT EXISTS `tipoayuda` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Volcado de datos para la tabla `tipoayuda`
--

INSERT INTO `tipoayuda` (`id`, `nombre`) VALUES
(1, 'SILLA DE RUEDAS'),
(2, 'MULETAS'),
(3, 'BASTON'),
(4, 'CAMA CLINICA'),
(5, 'BOMBONA DE OXIGENO'),
(6, 'PUPITRES'),
(7, 'MESAS'),
(8, 'PIZARRAS'),
(9, 'MATERIALES DE OFICINA'),
(10, 'COMEDOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoticket`
--

CREATE TABLE IF NOT EXISTS `tipoticket` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Volcado de datos para la tabla `tipoticket`
--

INSERT INTO `tipoticket` (`id`, `nombre`) VALUES
(1, 'RECLAMO'),
(2, 'QUEJA'),
(3, 'PETICIÓN'),
(4, 'SUGERENCIA'),
(5, 'DENUNCIA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipotramite`
--

CREATE TABLE IF NOT EXISTS `tipotramite` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipousuario`
--

CREATE TABLE IF NOT EXISTS `tipousuario` (
  `id` tinyint(2) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Volcado de datos para la tabla `tipousuario`
--

INSERT INTO `tipousuario` (`id`, `nombre`, `descripcion`) VALUES
(1, 'ADMIN. O.A.C', 'Administrador oficina de atención al ciudadano.'),
(2, 'ADMIN. OFICINA', 'Administrador ente.'),
(3, 'OPERADOR OFICINA', 'Operador de oficina'),
(4, 'OPERADOR SOLICITANTE', 'Operador solicitante.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tramite`
--

CREATE TABLE IF NOT EXISTS `tramite` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  `tiempo` varchar(45) DEFAULT NULL,
  `usuario` int(2) NOT NULL,
  `tipotramite` int(3) NOT NULL,
  `sector_tipoayuda` tinyint(2) NOT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_evento_usuario1_idx` (`usuario`),
  KEY `fk_tramite_tipotramite1_idx` (`tipotramite`),
  KEY `fk_tramite_sector_tipoayuda1_idx` (`sector_tipoayuda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tramite_funcionario`
--

CREATE TABLE IF NOT EXISTS `tramite_funcionario` (
  `tramite` int(3) NOT NULL,
  `funcionario` int(2) NOT NULL,
  PRIMARY KEY (`tramite`,`funcionario`),
  KEY `fk_evento_has_funcionario_funcionario1_idx` (`funcionario`),
  KEY `fk_evento_has_funcionario_evento1_idx` (`tramite`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `clave` varchar(255) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  `tipousuario` tinyint(2) DEFAULT NULL,
  `estatus` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usuario_tipousuario1_idx` (`tipousuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `clave`, `usuario`, `tipousuario`, `estatus`) VALUES
(1, 'e10adc3949ba59abbe56e057f20f883e', 'adminAC', 1, 1),
(2, 'e10adc3949ba59abbe56e057f20f883e', 'V16323102', 4, 1),
(3, 'e10adc3949ba59abbe56e057f20f883e', '4202700', 4, 1),
(4, 'e10adc3949ba59abbe56e057f20f883e', 'Concultura', 2, 1),
(5, 'e10adc3949ba59abbe56e057f20f883e', 'Siamtel', 2, 1),
(6, 'e10adc3949ba59abbe56e057f20f883e', 'Ceapdis', 2, 1),
(7, 'e10adc3949ba59abbe56e057f20f883e', 'HidrolaraUNO', 3, 1),
(8, 'e10adc3949ba59abbe56e057f20f883e', 'SiamtelUNO', 3, 1),
(9, 'e10adc3949ba59abbe56e057f20f883e', 'CeapdisUNO', 3, 1),
(10, 'e10adc3949ba59abbe56e057f20f883e', 'V4197355', 4, 1),
(11, 'e10adc3949ba59abbe56e057f20f883e', 'J1234567', 4, 1),
(12, 'e10adc3949ba59abbe56e057f20f883e', 'J1234569', 4, 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `fk_actividad_evento1` FOREIGN KEY (`tramite`) REFERENCES `tramite` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `actividad_funcionario`
--
ALTER TABLE `actividad_funcionario`
  ADD CONSTRAINT `fk_actividad_has_funcionario_actividad1` FOREIGN KEY (`actividad`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_actividad_has_funcionario_funcionario1` FOREIGN KEY (`funcionario`) REFERENCES `funcionario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `comunidad`
--
ALTER TABLE `comunidad`
  ADD CONSTRAINT `fk_comunidad_parroquia1` FOREIGN KEY (`parroquia`) REFERENCES `parroquia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_comunidad_persona1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `division`
--
ALTER TABLE `division`
  ADD CONSTRAINT `fk_division_ente1` FOREIGN KEY (`ente`) REFERENCES `ente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ente`
--
ALTER TABLE `ente`
  ADD CONSTRAINT `fk_ente_parroquia1` FOREIGN KEY (`parroquia`) REFERENCES `parroquia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ente_sector`
--
ALTER TABLE `ente_sector`
  ADD CONSTRAINT `fk_ente_has_sector_ente1` FOREIGN KEY (`ente`) REFERENCES `ente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ente_has_sector_sector1` FOREIGN KEY (`sector`) REFERENCES `sector` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `funcionario`
--
ALTER TABLE `funcionario`
  ADD CONSTRAINT `fk_funcionario_division1` FOREIGN KEY (`division`) REFERENCES `division` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_funcionario_ente1` FOREIGN KEY (`ente`) REFERENCES `ente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_funcionario_persona1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_funcionario_usuario1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `historicoticket`
--
ALTER TABLE `historicoticket`
  ADD CONSTRAINT `fk_historicoticket_funcionario1` FOREIGN KEY (`funcionarioregistro`) REFERENCES `funcionario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_historicoticket_funcionario2` FOREIGN KEY (`funcionariorecibido`) REFERENCES `funcionario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_historicoticket_ticket1` FOREIGN KEY (`ticket`) REFERENCES `ticket` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_menu_menu1` FOREIGN KEY (`padre`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `fk_municipio_estado1` FOREIGN KEY (`estado`) REFERENCES `estado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `parroquia`
--
ALTER TABLE `parroquia`
  ADD CONSTRAINT `fk_parroquia_municipio1` FOREIGN KEY (`municipio`) REFERENCES `municipio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `persona`
--
ALTER TABLE `persona`
  ADD CONSTRAINT `fk_persona_parroquia1` FOREIGN KEY (`parroquia`) REFERENCES `parroquia` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sector_tipoayuda`
--
ALTER TABLE `sector_tipoayuda`
  ADD CONSTRAINT `fk_sector_has_tipoayuda_sector1` FOREIGN KEY (`sector`) REFERENCES `sector` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_sector_has_tipoayuda_tipoayuda1` FOREIGN KEY (`tipoayuda`) REFERENCES `tipoayuda` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `solicitante`
--
ALTER TABLE `solicitante`
  ADD CONSTRAINT `fk_solicitante_comunidad1` FOREIGN KEY (`comunidad`) REFERENCES `comunidad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitante_persona1` FOREIGN KEY (`persona`) REFERENCES `persona` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_solicitante_usuario1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_tarea_actividad1` FOREIGN KEY (`actividad`) REFERENCES `actividad` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `fk_ticket_sector1` FOREIGN KEY (`sector`) REFERENCES `sector` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ticket_solicitante` FOREIGN KEY (`solicitante`) REFERENCES `solicitante` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ticket_tipoticket1` FOREIGN KEY (`tipoticket`) REFERENCES `tipoticket` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `ticket_tipoayuda`
--
ALTER TABLE `ticket_tipoayuda`
  ADD CONSTRAINT `fk_ticket_has_tipoayuda_ticket1` FOREIGN KEY (`ticket`) REFERENCES `ticket` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ticket_tipoayuda_tipoayuda1` FOREIGN KEY (`tipoayuda`) REFERENCES `tipoayuda` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tramite`
--
ALTER TABLE `tramite`
  ADD CONSTRAINT `fk_tramite_sector_tipoayuda1` FOREIGN KEY (`sector_tipoayuda`) REFERENCES `sector_tipoayuda` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tramite_tipotramite1` FOREIGN KEY (`tipotramite`) REFERENCES `tipotramite` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tramite_usuario1` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tramite_funcionario`
--
ALTER TABLE `tramite_funcionario`
  ADD CONSTRAINT `fk_evento_has_funcionario_evento1` FOREIGN KEY (`tramite`) REFERENCES `tramite` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_evento_has_funcionario_funcionario1` FOREIGN KEY (`funcionario`) REFERENCES `funcionario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_tipousuario1` FOREIGN KEY (`tipousuario`) REFERENCES `tipousuario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
