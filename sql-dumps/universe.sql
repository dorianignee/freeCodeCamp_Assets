--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(50) NOT NULL,
    diameter_in_ly numeric(10,0),
    distance_to_milky_way_in_ly numeric(10,0),
    galaxy_type_id integer
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: galaxy_type; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy_type (
    galaxy_type_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(50)
);


ALTER TABLE public.galaxy_type OWNER TO freecodecamp;

--
-- Name: galaxy_type_galaxy_type_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_type_galaxy_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_type_galaxy_type_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_type_galaxy_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_type_galaxy_type_id_seq OWNED BY public.galaxy_type.galaxy_type_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(50) NOT NULL,
    diameter_in_km integer,
    average_distance_to_planet_in_km integer,
    planet_id integer
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(50) NOT NULL,
    diameter_in_earth_diameters numeric(5,3),
    has_life boolean DEFAULT false NOT NULL,
    description text,
    star_id integer NOT NULL,
    distance_to_star_in_ae numeric(5,3)
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(50) NOT NULL,
    diameter_in_sun_sizes numeric(5,1),
    is_active boolean DEFAULT true NOT NULL,
    galaxy_id integer NOT NULL,
    distance_to_sun_in_ly numeric(10,3)
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: galaxy_type galaxy_type_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy_type ALTER COLUMN galaxy_type_id SET DEFAULT nextval('public.galaxy_type_galaxy_type_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milchstraße', 100000, 0, 1);
INSERT INTO public.galaxy VALUES (2, 'Canis-Major-Zwerg[1]', 20000, 25000, 2);
INSERT INTO public.galaxy VALUES (3, 'Sagittarius-Zwerggalaxie[2]', 10000, 78000, 3);
INSERT INTO public.galaxy VALUES (4, 'Ursa Major II[3]', 1000, 100000, 4);
INSERT INTO public.galaxy VALUES (5, 'Segue 2', 100, 114000, 4);
INSERT INTO public.galaxy VALUES (6, 'Bootes-II-Zwerg', 500, 136000, 4);
INSERT INTO public.galaxy VALUES (7, 'Coma-Berenices-Zwerggalaxie', 500, 137000, 4);
INSERT INTO public.galaxy VALUES (8, 'Bootes-III-Zwerg', 500, 150000, 4);
INSERT INTO public.galaxy VALUES (9, 'Große Magellansche Wolke', 25000, 165000, 5);
INSERT INTO public.galaxy VALUES (10, 'Kleine Magellansche Wolke', 15000, 195000, 5);
INSERT INTO public.galaxy VALUES (11, 'Bootes-I-Zwerg', 2000, 196000, 4);
INSERT INTO public.galaxy VALUES (12, 'Ursa-Minor-Zwerg', 2000, 215000, 6);
INSERT INTO public.galaxy VALUES (13, 'Sculptor-Zwerg[4]', 3000, 258000, 7);
INSERT INTO public.galaxy VALUES (14, 'Draco-Zwerg', 2000, 267000, 8);
INSERT INTO public.galaxy VALUES (15, 'Sextans-Zwerg', 3000, 280000, 4);
INSERT INTO public.galaxy VALUES (16, 'Ursa-Major-I[5]', 3000, 325000, 4);
INSERT INTO public.galaxy VALUES (17, 'Carina-Zwerg', 2000, 329000, 7);
INSERT INTO public.galaxy VALUES (18, 'Hercules-Zwerg', 2000, 430000, 9);
INSERT INTO public.galaxy VALUES (19, 'Fornax-Zwerg', 5000, 450000, 10);
INSERT INTO public.galaxy VALUES (20, 'Canes-Venatici-II-Zwerg', 1000, 490000, 4);
INSERT INTO public.galaxy VALUES (21, 'Leo IV', 1000, 520000, 4);
INSERT INTO public.galaxy VALUES (22, 'Leo V', 900, 570000, 4);
INSERT INTO public.galaxy VALUES (23, 'Pisces II', 400, 585000, 4);
INSERT INTO public.galaxy VALUES (24, 'Leo II', 3000, 669000, 8);
INSERT INTO public.galaxy VALUES (25, 'Canes Venatici-I-Zwerg', 6000, 718000, 4);
INSERT INTO public.galaxy VALUES (26, 'Leo I', 3000, 815000, 7);
INSERT INTO public.galaxy VALUES (27, 'Phoenix-Zwerg', 2000, 1450000, 11);
INSERT INTO public.galaxy VALUES (28, 'Barnards Galaxie', 6000, 1600000, 12);
INSERT INTO public.galaxy VALUES (29, 'Andromeda XVI', 0, 1720000, 4);
INSERT INTO public.galaxy VALUES (30, 'Andromeda XXIV', 0, 1960000, 4);
INSERT INTO public.galaxy VALUES (31, 'NGC 185', 8000, 2010000, 13);
INSERT INTO public.galaxy VALUES (32, 'Andromeda XXVIII', 0, 2120000, 4);
INSERT INTO public.galaxy VALUES (33, 'Andromeda II', 3000, 2165000, 4);
INSERT INTO public.galaxy VALUES (34, 'Leo III', 4000, 2250000, 14);
INSERT INTO public.galaxy VALUES (35, 'Andromeda X', 5000, 2290000, 4);
INSERT INTO public.galaxy VALUES (36, 'Andromeda XV', 0, 2300000, 4);
INSERT INTO public.galaxy VALUES (37, 'IC 1613', 10000, 2365000, 15);
INSERT INTO public.galaxy VALUES (38, 'NGC 147', 10000, 2370000, 16);
INSERT INTO public.galaxy VALUES (39, 'Andromeda XXIX', 0, 2380000, 4);
INSERT INTO public.galaxy VALUES (40, 'Andromeda XIV', 0, 2400000, 4);
INSERT INTO public.galaxy VALUES (41, 'Andromeda III', 3000, 2450000, 4);
INSERT INTO public.galaxy VALUES (42, 'Andromeda VII', 2000, 2465000, 4);
INSERT INTO public.galaxy VALUES (43, 'Andromeda XXVII', 0, 2470000, 4);
INSERT INTO public.galaxy VALUES (44, 'Andromeda XXVI', 0, 2480000, 4);
INSERT INTO public.galaxy VALUES (45, 'Cetus-Zwerg', 3000, 2485000, 4);
INSERT INTO public.galaxy VALUES (46, 'Andromeda XXIII', 0, 2500000, 4);
INSERT INTO public.galaxy VALUES (47, 'Andromeda IX', 4000, 2505000, 4);
INSERT INTO public.galaxy VALUES (48, 'LGS 3', 2000, 2520000, 11);
INSERT INTO public.galaxy VALUES (49, 'Andromeda I', 2000, 2520000, 4);
INSERT INTO public.galaxy VALUES (50, 'Andromeda V', 2000, 2560000, 4);
INSERT INTO public.galaxy VALUES (51, 'Andromeda XI', 2000, 2560000, 4);
INSERT INTO public.galaxy VALUES (52, 'Andromeda XII', 2000, 2560000, 4);
INSERT INTO public.galaxy VALUES (53, 'Andromeda XIII', 2000, 2560000, 4);
INSERT INTO public.galaxy VALUES (54, 'Andromeda XVII', 0, 2580000, 4);
INSERT INTO public.galaxy VALUES (55, 'Andromeda VI', 3000, 2595000, 4);
INSERT INTO public.galaxy VALUES (56, 'Andromedagalaxie', 140000, 2560000, 17);
INSERT INTO public.galaxy VALUES (57, 'Andromeda XX', 0, 2600000, 4);
INSERT INTO public.galaxy VALUES (58, 'M32', 8000, 2625000, 18);
INSERT INTO public.galaxy VALUES (59, 'Andromeda XXV', 0, 2650000, 4);
INSERT INTO public.galaxy VALUES (60, 'M110', 15000, 2690000, 16);
INSERT INTO public.galaxy VALUES (61, 'Andromeda VIII', 30000, 2700000, 19);
INSERT INTO public.galaxy VALUES (62, 'Dreiecksnebel', 55000, 2735000, 20);
INSERT INTO public.galaxy VALUES (63, 'IC 10', 8000, 2690000, 21);
INSERT INTO public.galaxy VALUES (64, 'Andromeda XXI', 0, 2800000, 4);
INSERT INTO public.galaxy VALUES (65, 'Tucana-Zwerg', 2000, 2870000, 4);
INSERT INTO public.galaxy VALUES (66, 'Andromeda XXII', 0, 3000000, 4);
INSERT INTO public.galaxy VALUES (67, 'Pegasus-Zwerg', 6000, 3000000, 11);
INSERT INTO public.galaxy VALUES (68, 'Andromeda XIX', 0, 3040000, 4);
INSERT INTO public.galaxy VALUES (69, 'Wolf-Lundmark-Melotte', 8000, 3020000, 15);
INSERT INTO public.galaxy VALUES (70, 'Aquarius-Zwerg', 3000, 3345000, 11);
INSERT INTO public.galaxy VALUES (71, 'SagDIG', 3000, 3460000, 21);
INSERT INTO public.galaxy VALUES (72, 'Antlia-Zwerg', 3000, 4030000, 11);
INSERT INTO public.galaxy VALUES (73, 'NGC 3109', 25000, 4075000, 22);
INSERT INTO public.galaxy VALUES (74, 'Sextans A', 5000, 4350000, 21);
INSERT INTO public.galaxy VALUES (75, 'Sextans B', 8000, 4385000, 21);
INSERT INTO public.galaxy VALUES (76, 'Andromeda XVIII', 0, 4420000, 4);
INSERT INTO public.galaxy VALUES (77, 'Reticulum II', 0, 100000, 4);
INSERT INTO public.galaxy VALUES (78, 'Eridanus II', 1800, 1190000, 4);
INSERT INTO public.galaxy VALUES (79, 'Horologium I', 0, 330000, 23);
INSERT INTO public.galaxy VALUES (80, 'Pictoris', 0, 370000, 23);
INSERT INTO public.galaxy VALUES (81, 'Phoenix II', 0, 330000, 23);
INSERT INTO public.galaxy VALUES (82, 'Grus I', 0, 390000, 4);
INSERT INTO public.galaxy VALUES (83, 'Eridanus III', 0, 290000, 23);
INSERT INTO public.galaxy VALUES (84, 'Tucana II', 0, 230000, 4);
INSERT INTO public.galaxy VALUES (85, 'Triangulum II', 230, 100000, 4);
INSERT INTO public.galaxy VALUES (86, 'Hydra II', 460, 420000, 4);
INSERT INTO public.galaxy VALUES (87, 'Pegasus III', 360, 700000, 4);
INSERT INTO public.galaxy VALUES (88, 'Grus II', 620, 170000, 4);
INSERT INTO public.galaxy VALUES (89, 'Tucana III', 290, 80000, 4);
INSERT INTO public.galaxy VALUES (90, 'Columba I', 680, 590000, 4);
INSERT INTO public.galaxy VALUES (91, 'Tucana IV', 820, 160000, 4);
INSERT INTO public.galaxy VALUES (92, 'Reticulum III', 420, 300000, 4);
INSERT INTO public.galaxy VALUES (93, 'Tucana V', 100, 180000, 4);
INSERT INTO public.galaxy VALUES (94, 'Indus II', 1200, 700000, 23);
INSERT INTO public.galaxy VALUES (95, 'Cetus II', 100, 100000, 23);
INSERT INTO public.galaxy VALUES (96, 'Horologium II', 300, 250000, 4);
INSERT INTO public.galaxy VALUES (97, 'Draco II', 130, 70000, 4);
INSERT INTO public.galaxy VALUES (98, 'Sagittarius II', 260, 220000, 4);
INSERT INTO public.galaxy VALUES (99, 'Crater II', 7200, 390000, 4);
INSERT INTO public.galaxy VALUES (100, 'Aquarius II', 1000, 350000, 4);


--
-- Data for Name: galaxy_type; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy_type VALUES (1, 'SB(rs)bc', 'Balkenspiralgalaxie');
INSERT INTO public.galaxy_type VALUES (2, '(dIrr)', 'unregelmäßige Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (3, 'dE', 'elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (4, 'dSph', 'sphärische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (5, 'Irr / SBm', 'unregelmäßige oder Balkenspiralgalaxie');
INSERT INTO public.galaxy_type VALUES (6, 'dSph / dE4', 'sphärische oder elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (7, 'dSph / dE3', 'sphärische oder elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (8, 'dSph / dE0', 'sphärische oder elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (9, 'dSph / dIrr', 'sphärische oder unregelmäßige Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (10, 'dSph / dE2', 'sphärische oder elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (11, 'dIrr / dSph', 'sphärische oder unregelmäßige Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (12, 'IB(s)m', 'unbekannt');
INSERT INTO public.galaxy_type VALUES (13, 'dSph / dE3p', 'sphärische oder elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (14, 'dIrr (IBm?)', 'unregelmäßige Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (15, 'Irr', 'unregelmäßige Galaxie');
INSERT INTO public.galaxy_type VALUES (16, 'dSph / dE5', 'sphärische oder elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (17, 'SBb', 'Balkenspiralgalaxie');
INSERT INTO public.galaxy_type VALUES (18, 'dE2', 'elliptische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (19, '(dSph)', 'sphärische Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (20, 'SAc', 'Spiralgalaxie');
INSERT INTO public.galaxy_type VALUES (21, 'dIrr', 'unregelmäßige Zwerggalaxie');
INSERT INTO public.galaxy_type VALUES (22, 'SB(s)m', 'Balkenspiralgalaxie');
INSERT INTO public.galaxy_type VALUES (23, 'dSph?', 'vermutlich sphärische Zwerggalaxie');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Mond', 3476, 384400, 3);
INSERT INTO public.moon VALUES (2, 'Phobos', 22, 9378, 4);
INSERT INTO public.moon VALUES (3, 'Deimos', 12, 23459, 4);
INSERT INTO public.moon VALUES (4, 'Io', 3643, 421800, 5);
INSERT INTO public.moon VALUES (5, 'Europa', 3122, 671100, 5);
INSERT INTO public.moon VALUES (6, 'Ganymed', 5262, 1070400, 5);
INSERT INTO public.moon VALUES (7, 'Kallisto', 4821, 1882700, 5);
INSERT INTO public.moon VALUES (8, 'Amalthea', 168, 181400, 5);
INSERT INTO public.moon VALUES (9, 'Himalia', 160, 11461000, 5);
INSERT INTO public.moon VALUES (10, 'Elara', 78, 11741000, 5);
INSERT INTO public.moon VALUES (11, 'Pasiphae', 58, 23624000, 5);
INSERT INTO public.moon VALUES (12, 'Sinope', 38, 23939000, 5);
INSERT INTO public.moon VALUES (13, 'Lysithea', 38, 11717000, 5);
INSERT INTO public.moon VALUES (14, 'Carme', 46, 23404000, 5);
INSERT INTO public.moon VALUES (15, 'Ananke', 28, 21276000, 5);
INSERT INTO public.moon VALUES (16, 'Leda', 18, 11165000, 5);
INSERT INTO public.moon VALUES (17, 'Thebe', 98, 221900, 5);
INSERT INTO public.moon VALUES (18, 'Adrastea', 16, 129000, 5);
INSERT INTO public.moon VALUES (19, 'Metis', 44, 128000, 5);
INSERT INTO public.moon VALUES (20, 'Callirrhoe', 7, 24102000, 5);
INSERT INTO public.moon VALUES (21, 'Themisto', 9, 7507000, 5);
INSERT INTO public.moon VALUES (22, 'Megaclite', 6, 23806000, 5);
INSERT INTO public.moon VALUES (23, 'Taygete', 5, 23360000, 5);
INSERT INTO public.moon VALUES (24, 'Chaldene', 4, 23179000, 5);
INSERT INTO public.moon VALUES (25, 'Harpalyke', 4, 21105000, 5);
INSERT INTO public.moon VALUES (26, 'Kalyke', 5, 23583000, 5);
INSERT INTO public.moon VALUES (27, 'Iocaste', 5, 21269000, 5);
INSERT INTO public.moon VALUES (28, 'Erinome', 3, 23279000, 5);
INSERT INTO public.moon VALUES (29, 'Isonoe', 4, 23217000, 5);
INSERT INTO public.moon VALUES (30, 'Praxidike', 7, 21147000, 5);
INSERT INTO public.moon VALUES (31, 'Autonoe', 4, 23039000, 5);
INSERT INTO public.moon VALUES (32, 'Thyone', 4, 20940000, 5);
INSERT INTO public.moon VALUES (33, 'Hermippe', 4, 21131000, 5);
INSERT INTO public.moon VALUES (34, 'Aitne', 3, 23231000, 5);
INSERT INTO public.moon VALUES (35, 'Eurydome', 3, 22865000, 5);
INSERT INTO public.moon VALUES (36, 'Euanthe', 3, 20799000, 5);
INSERT INTO public.moon VALUES (37, 'Euporie', 2, 19302000, 5);
INSERT INTO public.moon VALUES (38, 'Orthosie', 2, 20721000, 5);
INSERT INTO public.moon VALUES (39, 'Sponde', 2, 23487000, 5);
INSERT INTO public.moon VALUES (40, 'Kale', 2, 23217000, 5);
INSERT INTO public.moon VALUES (41, 'Pasithee', 2, 23096000, 5);
INSERT INTO public.moon VALUES (42, 'Hegemone', 3, 23947000, 5);
INSERT INTO public.moon VALUES (43, 'Mneme', 2, 21069000, 5);
INSERT INTO public.moon VALUES (44, 'Aoede', 4, 23981000, 5);
INSERT INTO public.moon VALUES (45, 'Thelxinoe', 2, 21162000, 5);
INSERT INTO public.moon VALUES (46, 'Arche', 3, 22931000, 5);
INSERT INTO public.moon VALUES (47, 'Kallichore', 2, 24043000, 5);
INSERT INTO public.moon VALUES (48, 'Helike', 4, 21263000, 5);
INSERT INTO public.moon VALUES (49, 'Carpo', 3, 16989000, 5);
INSERT INTO public.moon VALUES (50, 'Eukelade', 4, 23661000, 5);
INSERT INTO public.moon VALUES (51, 'Cyllene', 2, 24349000, 5);
INSERT INTO public.moon VALUES (52, 'Kore', 2, 24543000, 5);
INSERT INTO public.moon VALUES (53, 'Herse', 2, 23097000, 5);
INSERT INTO public.moon VALUES (54, 'S/2010 J 1', 2, 23314335, 5);
INSERT INTO public.moon VALUES (55, 'S/2010 J 2', 1, 20307150, 5);
INSERT INTO public.moon VALUES (56, 'Dia', 4, 12118000, 5);
INSERT INTO public.moon VALUES (57, 'S/2016 J 1', 1, 20650845, 5);
INSERT INTO public.moon VALUES (58, 'S/2003 J 18', 2, 20274000, 5);
INSERT INTO public.moon VALUES (59, 'S/2011 J 2', 1, 23463885, 5);
INSERT INTO public.moon VALUES (60, 'Eirene', 4, 23731770, 5);
INSERT INTO public.moon VALUES (61, 'Philophrosyne', 2, 22819950, 5);
INSERT INTO public.moon VALUES (62, 'S/2017 J 1', 2, 23547105, 5);
INSERT INTO public.moon VALUES (63, 'Eupheme', 2, 21199710, 5);
INSERT INTO public.moon VALUES (64, 'S/2003 J 19', 2, 22757000, 5);
INSERT INTO public.moon VALUES (65, 'Valetudo', 1, 18980000, 5);
INSERT INTO public.moon VALUES (66, 'S/2017 J 2', 2, 23303000, 5);
INSERT INTO public.moon VALUES (67, 'S/2017 J 3', 2, 20694000, 5);
INSERT INTO public.moon VALUES (68, 'Pandia', 3, 11525000, 5);
INSERT INTO public.moon VALUES (69, 'S/2017 J 5', 2, 23232000, 5);
INSERT INTO public.moon VALUES (70, 'S/2017 J 6', 2, 22455000, 5);
INSERT INTO public.moon VALUES (71, 'S/2017 J 7', 2, 20627000, 5);
INSERT INTO public.moon VALUES (72, 'S/2017 J 8', 1, 23232700, 5);
INSERT INTO public.moon VALUES (73, 'S/2017 J 9', 3, 21487000, 5);
INSERT INTO public.moon VALUES (74, 'Ersa', 3, 11483000, 5);
INSERT INTO public.moon VALUES (75, 'S/2011 J 1', 2, 22462000, 5);
INSERT INTO public.moon VALUES (76, 'S/2003 J 2', 2, 28570410, 5);
INSERT INTO public.moon VALUES (77, 'S/2003 J 4', 2, 23257920, 5);
INSERT INTO public.moon VALUES (78, 'S/2003 J 9', 1, 22441680, 5);
INSERT INTO public.moon VALUES (79, 'S/2003 J 10', 2, 24249600, 5);
INSERT INTO public.moon VALUES (80, 'S/2003 J 12', 1, 19002480, 5);
INSERT INTO public.moon VALUES (81, 'S/2003 J 16', 2, 21000000, 5);
INSERT INTO public.moon VALUES (82, 'S/2003 J 23', 2, 24055500, 5);
INSERT INTO public.moon VALUES (83, 'S/2003 J 24', 3, 23088000, 5);
INSERT INTO public.moon VALUES (84, 'S/2011 J 3', 3, 11829000, 5);
INSERT INTO public.moon VALUES (85, 'S/2016 J 3', 2, 22273000, 5);
INSERT INTO public.moon VALUES (86, 'S/2016 J 4', 1, 23728000, 5);
INSERT INTO public.moon VALUES (87, 'S/2018 J 2', 3, 11490000, 5);
INSERT INTO public.moon VALUES (88, 'S/2018 J 3', 1, 22888000, 5);
INSERT INTO public.moon VALUES (89, 'S/2018 J 4', 2, 16548600, 5);
INSERT INTO public.moon VALUES (90, 'S/2021 J 1', 1, 20723000, 5);
INSERT INTO public.moon VALUES (91, 'S/2021 J 2', 1, 21197500, 5);
INSERT INTO public.moon VALUES (92, 'S/2021 J 3', 2, 21553000, 5);
INSERT INTO public.moon VALUES (93, 'S/2021 J 4', 1, 22950000, 5);
INSERT INTO public.moon VALUES (94, 'S/2021 J 5', 2, 22893100, 5);
INSERT INTO public.moon VALUES (95, 'S/2021 J 6', 1, 23490100, 5);
INSERT INTO public.moon VALUES (96, 'S/2022 J 1', 2, 22074000, 5);
INSERT INTO public.moon VALUES (97, 'S/2022 J 2', 1, 22473000, 5);
INSERT INTO public.moon VALUES (98, 'S/2022 J 3', 1, 20968000, 5);
INSERT INTO public.moon VALUES (99, 'Mimas', 397, 185539, 6);
INSERT INTO public.moon VALUES (100, 'Enceladus', 499, 238042, 6);
INSERT INTO public.moon VALUES (101, 'Tethys', 1060, 294672, 6);
INSERT INTO public.moon VALUES (102, 'Dione', 1118, 377415, 6);
INSERT INTO public.moon VALUES (103, 'Rhea', 1528, 527068, 6);
INSERT INTO public.moon VALUES (104, 'Titan', 5150, 1221865, 6);
INSERT INTO public.moon VALUES (105, 'Hyperion', 266, 1500933, 6);
INSERT INTO public.moon VALUES (106, 'Iapetus', 1436, 3560854, 6);
INSERT INTO public.moon VALUES (107, 'Phoebe', 240, 12944300, 6);
INSERT INTO public.moon VALUES (108, 'Janus', 178, 151500, 6);
INSERT INTO public.moon VALUES (109, 'Epimetheus', 119, 151400, 6);
INSERT INTO public.moon VALUES (110, 'Helene', 32, 377440, 6);
INSERT INTO public.moon VALUES (111, 'Telesto', 24, 294720, 6);
INSERT INTO public.moon VALUES (112, 'Calypso', 19, 294720, 6);
INSERT INTO public.moon VALUES (113, 'Atlas', 32, 137700, 6);
INSERT INTO public.moon VALUES (114, 'Prometheus', 100, 139400, 6);
INSERT INTO public.moon VALUES (115, 'Pandora', 84, 141700, 6);
INSERT INTO public.moon VALUES (116, 'Pan', 20, 133600, 6);
INSERT INTO public.moon VALUES (117, 'Ymir', 18, 23040000, 6);
INSERT INTO public.moon VALUES (118, 'Paaliaq', 22, 15200000, 6);
INSERT INTO public.moon VALUES (119, 'Tarvos', 15, 17983000, 6);
INSERT INTO public.moon VALUES (120, 'Ijiraq', 12, 11124000, 6);
INSERT INTO public.moon VALUES (121, 'Suttungr', 7, 19459000, 6);
INSERT INTO public.moon VALUES (122, 'Kiviuq', 16, 11111000, 6);
INSERT INTO public.moon VALUES (123, 'Mundilfari', 7, 18685000, 6);
INSERT INTO public.moon VALUES (124, 'Albiorix', 32, 16182000, 6);
INSERT INTO public.moon VALUES (125, 'Skathi', 8, 15541000, 6);
INSERT INTO public.moon VALUES (126, 'Erriapus', 10, 17343000, 6);
INSERT INTO public.moon VALUES (127, 'Siarnaq', 40, 17531000, 6);
INSERT INTO public.moon VALUES (128, 'Thrymr', 7, 20474000, 6);
INSERT INTO public.moon VALUES (129, 'Narvi', 7, 19007000, 6);
INSERT INTO public.moon VALUES (130, 'Methone', 3, 194000, 6);
INSERT INTO public.moon VALUES (131, 'Pallene', 4, 211000, 6);
INSERT INTO public.moon VALUES (132, 'Polydeuces', 4, 377220, 6);
INSERT INTO public.moon VALUES (133, 'Daphnis', 7, 136500, 6);
INSERT INTO public.moon VALUES (134, 'Aegir', 6, 20735000, 6);
INSERT INTO public.moon VALUES (135, 'Bebhionn', 6, 17119000, 6);
INSERT INTO public.moon VALUES (136, 'Bergelmir', 6, 19338000, 6);
INSERT INTO public.moon VALUES (137, 'Bestla', 7, 20129000, 6);
INSERT INTO public.moon VALUES (138, 'Farbauti', 5, 20390000, 6);
INSERT INTO public.moon VALUES (139, 'Fenrir', 4, 22453000, 6);
INSERT INTO public.moon VALUES (140, 'Fornjot', 6, 25108000, 6);
INSERT INTO public.moon VALUES (141, 'Hati', 6, 19856000, 6);
INSERT INTO public.moon VALUES (142, 'Hyrrokkin', 8, 18437000, 6);
INSERT INTO public.moon VALUES (143, 'Kari', 7, 22118000, 6);
INSERT INTO public.moon VALUES (144, 'Loge', 6, 23065000, 6);
INSERT INTO public.moon VALUES (145, 'Skoll', 6, 17665000, 6);
INSERT INTO public.moon VALUES (146, 'Surtur', 6, 22707000, 6);
INSERT INTO public.moon VALUES (147, 'Anthe', 1, 197700, 6);
INSERT INTO public.moon VALUES (148, 'Jarnsaxa', 6, 18811000, 6);
INSERT INTO public.moon VALUES (149, 'Greip', 6, 18206000, 6);
INSERT INTO public.moon VALUES (150, 'Tarqeq', 7, 18009000, 6);
INSERT INTO public.moon VALUES (151, 'Aegaeon', 1, 167500, 6);
INSERT INTO public.moon VALUES (152, 'Gridr', 4, 19211000, 6);
INSERT INTO public.moon VALUES (153, 'Angrboda', 3, 20379900, 6);
INSERT INTO public.moon VALUES (154, 'Skrymir', 4, 21427000, 6);
INSERT INTO public.moon VALUES (155, 'Gerd', 3, 20544500, 6);
INSERT INTO public.moon VALUES (156, 'S/2004 S 26', 4, 26737800, 6);
INSERT INTO public.moon VALUES (157, 'Eggther', 4, 19776700, 6);
INSERT INTO public.moon VALUES (158, 'S/2004 S 29', 4, 17470700, 6);
INSERT INTO public.moon VALUES (159, 'Beli', 3, 20424000, 6);
INSERT INTO public.moon VALUES (160, 'Gunnlod', 4, 21564200, 6);
INSERT INTO public.moon VALUES (161, 'Thiazzi', 4, 23764800, 6);
INSERT INTO public.moon VALUES (162, 'S/2004 S 34', 3, 24358900, 6);
INSERT INTO public.moon VALUES (163, 'Alvaldi', 4, 21953200, 6);
INSERT INTO public.moon VALUES (164, 'Geirrod', 4, 23006200, 6);
INSERT INTO public.moon VALUES (165, 'S/2004 S 7', 6, 19800000, 6);
INSERT INTO public.moon VALUES (166, 'S/2004 S 12', 5, 19650000, 6);
INSERT INTO public.moon VALUES (167, 'S/2004 S 13', 6, 18450000, 6);
INSERT INTO public.moon VALUES (168, 'S/2004 S 17', 4, 18600000, 6);
INSERT INTO public.moon VALUES (169, 'S/2004 S 21', 3, 23810400, 6);
INSERT INTO public.moon VALUES (170, 'S/2004 S 24', 3, 23231300, 6);
INSERT INTO public.moon VALUES (171, 'S/2004 S 28', 4, 21791300, 6);
INSERT INTO public.moon VALUES (172, 'S/2004 S 31', 4, 17402800, 6);
INSERT INTO public.moon VALUES (173, 'S/2004 S 36', 3, 23698700, 6);
INSERT INTO public.moon VALUES (174, 'S/2004 S 37', 4, 16003300, 6);
INSERT INTO public.moon VALUES (175, 'S/2004 S 39', 2, 23574814, 6);
INSERT INTO public.moon VALUES (176, 'S/2004 S 40', 2, 16145300, 6);
INSERT INTO public.moon VALUES (177, 'S/2004 S 41', 2, 17921900, 6);
INSERT INTO public.moon VALUES (178, 'S/2004 S 42', 2, 18119450, 6);
INSERT INTO public.moon VALUES (179, 'S/2004 S 43', 2, 18918200, 6);
INSERT INTO public.moon VALUES (180, 'S/2004 S 44', 3, 1947880, 6);
INSERT INTO public.moon VALUES (181, 'S/2004 S 45', 3, 20037400, 6);
INSERT INTO public.moon VALUES (182, 'S/2004 S 46', 2, 20213900, 6);
INSERT INTO public.moon VALUES (183, 'S/2004 S 47', 2, 16001200, 6);
INSERT INTO public.moon VALUES (184, 'S/2004 S 48', 3, 22362550, 6);
INSERT INTO public.moon VALUES (185, 'S/2004 S 49', 2, 22859200, 6);
INSERT INTO public.moon VALUES (186, 'S/2004 S 50', 2, 22009950, 6);
INSERT INTO public.moon VALUES (187, 'S/2004 S 51', 3, 25771750, 6);
INSERT INTO public.moon VALUES (188, 'S/2004 S 52', 2, 26091500, 6);
INSERT INTO public.moon VALUES (189, 'S/2004 S 53', 2, 23764100, 6);
INSERT INTO public.moon VALUES (190, 'S/2005 S 4', 4, 11302650, 6);
INSERT INTO public.moon VALUES (191, 'S/2005 S 5', 2, 21030150, 6);
INSERT INTO public.moon VALUES (192, 'S/2006 S 1', 5, 18735600, 6);
INSERT INTO public.moon VALUES (193, 'S/2006 S 3', 6, 21408300, 6);
INSERT INTO public.moon VALUES (194, 'S/2006 S 9', 2, 14453000, 6);
INSERT INTO public.moon VALUES (195, 'S/2006 S 10', 2, 18837300, 6);
INSERT INTO public.moon VALUES (196, 'S/2006 S 11', 2, 19523200, 6);
INSERT INTO public.moon VALUES (197, 'S/2006 S 12', 2, 19837650, 6);
INSERT INTO public.moon VALUES (198, 'S/2006 S 13', 2, 20072550, 6);
INSERT INTO public.moon VALUES (199, 'S/2006 S 14', 2, 21177950, 6);
INSERT INTO public.moon VALUES (200, 'S/2006 S 15', 2, 21580050, 6);
INSERT INTO public.moon VALUES (201, 'S/2006 S 16', 2, 21988950, 6);
INSERT INTO public.moon VALUES (202, 'S/2006 S 17', 3, 22528950, 6);
INSERT INTO public.moon VALUES (203, 'S/2006 S 18', 3, 23256000, 6);
INSERT INTO public.moon VALUES (204, 'S/2006 S 19', 2, 23262950, 6);
INSERT INTO public.moon VALUES (205, 'S/2006 S 20', 2, 13163950, 6);
INSERT INTO public.moon VALUES (206, 'S/2007 S 2', 4, 15850000, 6);
INSERT INTO public.moon VALUES (207, 'S/2007 S 3', 5, 20518500, 6);
INSERT INTO public.moon VALUES (208, 'S/2007 S 5', 2, 15899550, 6);
INSERT INTO public.moon VALUES (209, 'S/2007 S 6', 2, 18563750, 6);
INSERT INTO public.moon VALUES (210, 'S/2007 S 7', 2, 15818650, 6);
INSERT INTO public.moon VALUES (211, 'S/2007 S 8', 2, 16991800, 6);
INSERT INTO public.moon VALUES (212, 'S/2007 S 9', 2, 20548000, 6);
INSERT INTO public.moon VALUES (213, 'S/2009 S 1', 0, 117000, 6);
INSERT INTO public.moon VALUES (214, 'S/2019 S 1', 5, 11221100, 6);
INSERT INTO public.moon VALUES (215, 'S/2019 S 2', 2, 16568400, 6);
INSERT INTO public.moon VALUES (216, 'S/2019 S 3', 2, 17125000, 6);
INSERT INTO public.moon VALUES (217, 'S/2019 S 4', 2, 17957200, 6);
INSERT INTO public.moon VALUES (218, 'S/2019 S 5', 2, 18918950, 6);
INSERT INTO public.moon VALUES (219, 'S/2019 S 6', 2, 19996100, 6);
INSERT INTO public.moon VALUES (220, 'S/2019 S 7', 2, 20475400, 6);
INSERT INTO public.moon VALUES (221, 'S/2019 S 8', 2, 20309550, 6);
INSERT INTO public.moon VALUES (222, 'S/2019 S 9', 2, 20605100, 6);
INSERT INTO public.moon VALUES (223, 'S/2019 S 10', 2, 20918150, 6);
INSERT INTO public.moon VALUES (224, 'S/2019 S 11', 2, 20518700, 6);
INSERT INTO public.moon VALUES (225, 'S/2019 S 12', 2, 20928900, 6);
INSERT INTO public.moon VALUES (226, 'S/2019 S 13', 2, 20959750, 6);
INSERT INTO public.moon VALUES (227, 'S/2019 S 14', 2, 18005050, 6);
INSERT INTO public.moon VALUES (228, 'S/2019 S 15', 2, 21246200, 6);
INSERT INTO public.moon VALUES (229, 'S/2019 S 16', 2, 23677600, 6);
INSERT INTO public.moon VALUES (230, 'S/2019 S 17', 3, 23233250, 6);
INSERT INTO public.moon VALUES (231, 'S/2019 S 18', 2, 23555350, 6);
INSERT INTO public.moon VALUES (232, 'S/2019 S 19', 2, 23471950, 6);
INSERT INTO public.moon VALUES (233, 'S/2019 S 20', 2, 23483700, 6);
INSERT INTO public.moon VALUES (234, 'S/2019 S 21', 2, 26075750, 6);
INSERT INTO public.moon VALUES (235, 'S/2020 S 1', 2, 11339600, 6);
INSERT INTO public.moon VALUES (236, 'S/2020 S 2', 2, 18071600, 6);
INSERT INTO public.moon VALUES (237, 'S/2020 S 3', 2, 17929800, 6);
INSERT INTO public.moon VALUES (238, 'S/2020 S 4', 2, 18115850, 6);
INSERT INTO public.moon VALUES (239, 'S/2020 S 5', 2, 18422200, 6);
INSERT INTO public.moon VALUES (240, 'S/2020 S 6', 2, 21159200, 6);
INSERT INTO public.moon VALUES (241, 'S/2020 S 7', 2, 17236200, 6);
INSERT INTO public.moon VALUES (242, 'S/2020 S 8', 2, 21800150, 6);
INSERT INTO public.moon VALUES (243, 'S/2020 S 9', 2, 26000200, 6);
INSERT INTO public.moon VALUES (244, 'S/2020 S 10', 2, 25046050, 6);
INSERT INTO public.moon VALUES (245, 'Ariel', 1158, 190900, 7);
INSERT INTO public.moon VALUES (246, 'Umbriel', 1169, 266000, 7);
INSERT INTO public.moon VALUES (247, 'Titania', 1578, 436300, 7);
INSERT INTO public.moon VALUES (248, 'Oberon', 1522, 583500, 7);
INSERT INTO public.moon VALUES (249, 'Miranda', 471, 129872, 7);
INSERT INTO public.moon VALUES (250, 'Cordelia', 40, 49800, 7);
INSERT INTO public.moon VALUES (251, 'Ophelia', 42, 53800, 7);
INSERT INTO public.moon VALUES (252, 'Bianca', 51, 59200, 7);
INSERT INTO public.moon VALUES (253, 'Cressida', 80, 61800, 7);
INSERT INTO public.moon VALUES (254, 'Desdemona', 64, 62700, 7);
INSERT INTO public.moon VALUES (255, 'Juliet', 93, 64400, 7);
INSERT INTO public.moon VALUES (256, 'Portia', 135, 66097, 7);
INSERT INTO public.moon VALUES (257, 'Rosalind', 72, 69900, 7);
INSERT INTO public.moon VALUES (258, 'Belinda', 80, 75300, 7);
INSERT INTO public.moon VALUES (259, 'Puck', 162, 86000, 7);
INSERT INTO public.moon VALUES (260, 'Caliban', 72, 7231000, 7);
INSERT INTO public.moon VALUES (261, 'Sycorax', 150, 12179000, 7);
INSERT INTO public.moon VALUES (262, 'Prospero', 50, 16256000, 7);
INSERT INTO public.moon VALUES (263, 'Setebos', 47, 17418000, 7);
INSERT INTO public.moon VALUES (264, 'Stephano', 32, 8004000, 7);
INSERT INTO public.moon VALUES (265, 'Trinculo', 18, 8504000, 7);
INSERT INTO public.moon VALUES (266, 'Francisco', 22, 4276000, 7);
INSERT INTO public.moon VALUES (267, 'Margaret', 20, 14345000, 7);
INSERT INTO public.moon VALUES (268, 'Ferdinand', 21, 20901000, 7);
INSERT INTO public.moon VALUES (269, 'Perdita', 20, 76417, 7);
INSERT INTO public.moon VALUES (270, 'Mab', 10, 97736, 7);
INSERT INTO public.moon VALUES (271, 'Cupid', 10, 74392, 7);
INSERT INTO public.moon VALUES (272, 'S/2023 U 1', 8, 7999500, 7);
INSERT INTO public.moon VALUES (273, 'Triton', 2706, 354800, 8);
INSERT INTO public.moon VALUES (274, 'Nereid', 340, 5513400, 8);
INSERT INTO public.moon VALUES (275, 'Naiad', 58, 48200, 8);
INSERT INTO public.moon VALUES (276, 'Thalassa', 80, 50100, 8);
INSERT INTO public.moon VALUES (277, 'Despina', 148, 52500, 8);
INSERT INTO public.moon VALUES (278, 'Galatea', 158, 62000, 8);
INSERT INTO public.moon VALUES (279, 'Larissa', 192, 73500, 8);
INSERT INTO public.moon VALUES (280, 'Proteus', 416, 117600, 8);
INSERT INTO public.moon VALUES (281, 'Halimede', 61, 15728000, 8);
INSERT INTO public.moon VALUES (282, 'Psamathe', 38, 46695000, 8);
INSERT INTO public.moon VALUES (283, 'Sao', 40, 22422000, 8);
INSERT INTO public.moon VALUES (284, 'Laomedeia', 40, 23571000, 8);
INSERT INTO public.moon VALUES (285, 'Neso', 60, 48387000, 8);
INSERT INTO public.moon VALUES (286, 'Hippocamp', 35, 105283, 8);
INSERT INTO public.moon VALUES (287, 'S/2002 N 5', 23, 23414700, 8);
INSERT INTO public.moon VALUES (288, 'S/2021 N 1', 14, 50760000, 8);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (9, 'Proxima Centauri b', NULL, false, NULL, 4, NULL);
INSERT INTO public.planet VALUES (10, 'Proxima Centauri c', NULL, false, NULL, 4, NULL);
INSERT INTO public.planet VALUES (11, 'Lalande 21185 b', NULL, false, NULL, 8, NULL);
INSERT INTO public.planet VALUES (12, 'Lalande 21185 c', NULL, false, NULL, 8, NULL);
INSERT INTO public.planet VALUES (1, 'Merkur', 0.383, false, 'The nearest planet to the sun', 1, 0.387);
INSERT INTO public.planet VALUES (2, 'Venus', 0.949, false, 'The blue pearl', 1, 0.723);
INSERT INTO public.planet VALUES (3, 'Erde', 1.000, true, 'The only known planet to contain life', 1, 1.000);
INSERT INTO public.planet VALUES (4, 'Mars', 0.533, false, 'The red desert planet', 1, 1.524);
INSERT INTO public.planet VALUES (5, 'Jupiter', 11.209, false, 'The largest planet in our solar system', 1, 5.203);
INSERT INTO public.planet VALUES (6, 'Saturn', 9.449, false, 'The best known planet to have rings', 1, 9.537);
INSERT INTO public.planet VALUES (7, 'Uranus', 4.007, false, 'Has rings, too', 1, 19.191);
INSERT INTO public.planet VALUES (8, 'Neptun', 3.883, false, 'Also has rings', 1, 30.069);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 1.0, true, 1, 0.000);
INSERT INTO public.star VALUES (2, 'Alpha Centauri A', 1.2, true, 1, 4.344);
INSERT INTO public.star VALUES (3, 'Alpha Centauri B', 0.9, true, 1, 4.344);
INSERT INTO public.star VALUES (4, 'Proxima Centauri', 0.2, true, 1, 4.246);
INSERT INTO public.star VALUES (5, 'Barnards Arrow Star', 0.2, true, 1, 5.963);
INSERT INTO public.star VALUES (6, 'Luhman 16 A', NULL, true, 1, 6.502);
INSERT INTO public.star VALUES (7, 'Luhman 16 B', NULL, true, 1, 6.502);
INSERT INTO public.star VALUES (8, 'Lalande 21185', NULL, true, 1, 8.304);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 100, true);


--
-- Name: galaxy_type_galaxy_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_type_galaxy_type_id_seq', 24, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 288, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 8, true);


--
-- Name: galaxy galaxy_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_name_unique UNIQUE (name);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: galaxy_type galaxy_type_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy_type
    ADD CONSTRAINT galaxy_type_name_key UNIQUE (name);


--
-- Name: galaxy_type galaxy_type_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy_type
    ADD CONSTRAINT galaxy_type_pkey PRIMARY KEY (galaxy_type_id);


--
-- Name: moon moon_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_name_unique UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_name_unique UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_name_unique; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_name_unique UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: galaxy galaxy_galaxy_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_galaxy_type_id_fkey FOREIGN KEY (galaxy_type_id) REFERENCES public.galaxy_type(galaxy_type_id);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

