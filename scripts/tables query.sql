create table rol (
	idRol int  identity not null, 
	nombre varchar(100) not null, 

	constraint pk_idRol primary key (idRol)
);

create table persona (
	idPersona int identity not null, 
	nombres varchar(100) not null,
	apellidos varchar(100) not null,
	telefono varchar(15) not null, 
	idRol int not null,

	constraint pk_idPersona primary key (idPersona),
	constraint fk_idRol foreign key (idRol) references rol (idRol)
);

create table equipo (
	idEquipo int identity not null,
	nombre varchar(100) not null,
	idPersona int not null,

	constraint pk_idEquipo primary key (idEquipo),
	constraint fk_idPersona foreign key (idPersona) references persona (idPersona)
);

create table jugador (
	idJugador int identity not null,
	nombres varchar(100) not null,
	apellidos varchar(100) not null,
	fechaNacimiento datetime not null,
	idEquipo int not null,

	constraint fk_idEquipo foreign key (idEquipo) references equipo (idEquipo),
	constraint pk_idJugador primary key (idJugador)
);


create table torneo (
	idTorneo int identity not null,
	nombre varchar(100) not null, 
	idPersona int not null,

	constraint fk_Persona foreign key (idPersona) references persona (idPersona),
	constraint pk_idTorneo primary key (idTorneo)

);




