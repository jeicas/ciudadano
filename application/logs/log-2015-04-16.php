<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed'); ?>

ERROR - 2015-04-16 08:29:17 --> Severity: Warning  --> mysql_connect():  C:\xampp\htdocs\ciudadano\system\database\drivers\mysql\mysql_driver.php 73
ERROR - 2015-04-16 08:29:17 --> Unable to connect to the database
ERROR - 2015-04-16 16:10:18 --> Severity: Notice  --> Array to string conversion C:\xampp\htdocs\ciudadano\system\database\DB_active_rec.php 427
ERROR - 2015-04-16 16:10:18 --> Query error: Unknown column 'Array' in 'where clause'
ERROR - 2015-04-16 16:16:02 --> Query error: Cannot add or update a child row: a foreign key constraint fails (`ciudadano`.`comunidad`, CONSTRAINT `fk_comunidad_persona1` FOREIGN KEY (`nacionalidad`, `cedula`) REFERENCES `persona` (`nacionalidad`, `cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION)
