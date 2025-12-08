import requests
import json
import time

# Lista de nomes raros (coloque até 500 ou mais)
nomes = [
    "Aglair", "Belmira", "Celene", "Dagmar", "Edcarlos", "Firmino",
    "Geralda", "Hermes", "Inácio", "Jandira", "Kaline", "Ladislau",
    "Melquisedeque", "Nadir", "Odilon", "Perpétua", "Quitéria",
    "Rogaciano", "Sirlene", "Teodolino", "Ubirajara", "Valmor",
    "Wanderlândia", "Xisto", "Yolanda", "Zulmira",

    "Abdenago", "Adailton", "Adairton", "Adalcides", "Adauto",
    "Adevaldo", "Admilson", "Adoniram", "Adrelina", "Aderbal",
    "Aderlan", "Adivalda", "Agenair", "Agnaldo", "Agripino",
    "Ailza", "Airton", "Ajuricaba", "Alaíde", "Alcebíades",
    "Aldevan", "Aldiciane", "Aldivânia", "Aleudina", "Alfeu",
    "Almerinda", "Almirante", "Almira", "Altevir", "Amalfi",
    "Ambrósio", "Amilca", "Amiraldo", "Amália", "Anacleto",
    "Anailde", "Anastácio", "Anazildo", "Anésia", "Angerico",
    "Aniceto", "Anselmo", "Antenor", "Antero", "Araci",
    "Aralton", "Arcilene", "Ardilene", "Argemiro", "Argentino",
    "Ariclenes", "Arilma", "Aristides", "Arlindo", "Arnaldo",
    "Arnóbio", "Aroldo", "Artemísia", "Arquimedes", "Asdrúbal",
    "Assis", "Ataliba", "Atenaide", "Atílio", "Aúrea",
    "Auricélio", "Auristela", "Avelino", "Aviz", "Azenate",

    "Balbina", "Baltazar", "Barcelos", "Bartira",
    "Bastiana", "Belarmino", "Belchior", "Belizário", "Belmário",
    "Bendito", "Benvinda", "Berenice", "Berilo", "Bertoldo",
    "Bibiana", "Birajara", "Boanerges", "Bonifácio", "Brandão",

    "Caetano", "Caetana", "Caldeira", "Camurça", "Candinha",
    "Capitulina", "Capistrano", "Carmino", "Cariston", "Carmezinda",
    "Carmiro", "Cazemiro", "Cecim", "Celimo", "Celmira",
    "Celsina", "Celtânia", "Ceres", "Cícero", "Cidônio",
    "Cilene", "Cinésia", "Cipriano", "Cirineu", "Cirléia",
    "Cirne", "Cismira", "Claudeci", "Claudinéia", "Cleideane",
    "Clemilda", "Clementino", "Cleso", "Cleston", "Cletiane",
    "Climério", "Clodovaldo", "Clodomir", "Clotária", "Cnebora",
    "Colatina", "Conceiçãozinho", "Conrado", "Coraci", "Cosme",
    "Cristalina", "Crispim", "Cursino", "Custódio",

    "Dacir", "Dacio", "Dalci", "Dalmiro", "Dalmira", "Damiana",
    "Damião", "Dandara", "Darciana", "Darlan", "Darlindo",
    "Davilson", "Deciane", "Decírio", "Dejane", "Dejanira",
    "Delcimar", "Delcimara", "Delmiro", "Delzuita", "Demerval",
    "Demétrio", "Denísio", "Derci", "Derisvaldo", "Desirê",
    "Deusdedite", "Deuzuita", "Dianor", "Dielson", "Digna",
    "Dilamar", "Dilciane", "Dilermando", "Dilon", "Dimar",
    "Dinalva", "Dinorá", "Dirceu", "Dirlen", "Divina",
    "Divonzir", "Djanira", "Djair", "Djalma", "Djalme",
    "Domar", "Domiciana", "Domingos", "Domingas", "Donata",
    "Dorcelina", "Doralice", "Doresmar", "Dorvan", "Dulcelina",

    "Eberson", "Edelweiss", "Edglésia", "Edicleia", "Ediclézio",
    "Edilberto", "Edilena", "Edimara", "Edimundo", "Edinária",
    "Edirlan", "Edmarcia", "Edmilene", "Edmilson", "Ednilson",
    "Edsonete", "Eduvirges", "Efigênia", "Egídio", "Elcimar",
    "Elcimara", "Eldemar", "Elenaldo", "Elenice", "Elenilda",
    "Elenilson", "Elenir", "Eleotério", "Elesbão", "Eliabe",
    "Elianaide", "Eliezio", "Eliseba", "Elismar", "Elissandro",
    "Elizandro", "Elizete", "Eliziane", "Ellery", "Elmar",
    "Elpídio", "Elsimar", "Elvécio", "Emeliana", "Emerenciana",
    "Emídio", "Emiliana", "Encarnación", "Eneas", "Eneida",
    "Enezio", "Enoque", "Enuzia", "Epaminondas", "Eraclito",
    "Erandir", "Erdilene", "Eremita", "Eriberto", "Eridiana",
    "Erismar", "Erivânia", "Eronice", "Eronides", "Eronildo",
    "Eronita", "Ervaldo", "Esmeraldo", "Esmerina", "Espedito",
    "Etevaldo", "Etelvina", "Euclides", "Eudália", "Eufrásio",
    "Eulália", "Eunápio", "Eurico", "Eurípedes", "Eusébio",
    "Evair", "Evaldo", "Evandro", "Evenício", "Everaldo",
    "Evidência", "Evonete", "Exaltação",

    "Fabrina", "Felisberto", "Felisbina", "Felismino", "Felix",
    "Ferdinando", "Ferminiano", "Fidélis", "Filomena", "Firmino",
    "Flaviano", "Florêncio", "Floriana", "Floripes", "Florisbela",
    "Fortunato", "Francelino", "Francilda", "Francinete",
    "Francelina", "Frederico", "Fulgêncio",

    "Galdino", "Garibaldi", "Genaro", "Genciana", "Geraldo",
    "Geremias", "Germano", "Getúlio", "Gianeide", "Gilcimar",
    "Gilcimara", "Gileade", "Gilmara", "Gilmar", "Gilsonete",
    "Ginézio", "Ginézia", "Gislene", "Gisnardo", "Givonaldo",
    "Godofredo", "Gonçalo", "Graziela", "Gregório", "Guerino",

    "Hedervaldo", "Heitorina", "Helcimar", "Heleodora", "Helion",
    "Heliomar", "Hélvia", "Hemetério", "Henriqueta", "Heráclito",
    "Herondina", "Herval", "Higino", "Hilário", "Hilma",
    "Hipólito", "Hortênsia",

    "Ibanez", "Idalina", "Idelfonso", "Idemar", "Idenilson",
    "Idone", "Ifigênia", "Ildebrando", "Ilídia", "Ilton",
    "Imaculada", "Indalécio", "Inocêncio", "Ioannis", "Iracilda",
    "Iraci", "Irajá", "Irani", "Iremar", "Irenice", "Isaltina",
    "Isidoro", "Itacy", "Itamar", "Itaparica", "Ivaldo",

    "Jacilda", "Jacinto", "Jadir", "Jadson", "Jaquelineide",
    "Jardelina", "Jario", "Jasminete", "Jasson", "Jaury",
    "Jeciane", "Jecivaldo", "Jeová", "Jeremias", "Jerusalina",
    "Jessivaldo", "Jociara", "Joelina", "Joenilson", "Joner",
    "Josafá", "Josefina", "Joselito", "Josilene", "Josivaldo",
    "Jovelina", "Jucelino", "Jucimara", "Judite", "Jucir",
    "Juliete", "Justina",

    "Laedel", "Laertina", "Laudelino", "Laudelina", "Laurêncio",
    "Laurinda", "Lavínia", "Leciana", "Ledivaldo", "Leocádia",
    "Leodato", "Leonídia", "Leony", "Leotério", "Letícia",
    "Liares", "Lidean", "Lindaci", "Lindalva", "Lindolfo",
    "Lindomar", "Lindonéia", "Linoel", "Lira", "Lisandro",
    "Lucinete", "Lucimara", "Lucimar", "Lucinato", "Ludomila",

    "Madalena", "Mafalda", "Magalhães", "Magna", "Magnólia",
    "Maiane", "Mailson", "Malvina", "Manasses", "Manoelita",
    "Maraíse", "Marcelina", "Marcolino", "Marcília", "Marcílio",
    "Margarida", "Mariângela", "Marinaldo", "Marinalva",
    "Marinelma", "Maristela", "Marivaldo", "Marleneide",
    "Martimiano", "Matildes", "Melânia", "Mendonça", "Merlinda",
    "Messias", "Micaelina", "Miguela", "Milciana", "Milcíades",
    "Miltonete", "Mirelly", "Mirtes", "Mizabel", "Mizael",
    "Moadir", "Moacir", "Modesta", "Moisés", "Monalisa",
    "Morenaide", "Mundico",

    "Nacif", "Nadir", "Nair", "Nairton", "Nalzira", "Nancilene",
    "Narciso", "Nascimenta", "Natalina", "Neidinha", "Neiton",
    "Nelci", "Nelsina", "Nenezio", "Nicácio", "Nicodemos",
    "Nielson", "Nigelina", "Nilcéia", "Nilcimar", "Nilsonete",
    "Nivaldete", "Nivardo", "Noêmia", "Norberto", "Norcion",
    "Normélia", "Novacir",

    "Odairzinho", "Odecio", "Odete", "Odineide", "Odimar",
    "Odirlei", "Odivaldo", "Olegário", "Olenice", "Olga",
    "Olivério", "Olivina", "Olmira", "Omarino", "Ondina",
    "Onofre", "Orandir", "Orentina", "Orides", "Orlandina",
    "Orozina", "Osnilda", "Osmário", "Osvanira",

    "Pablocezar", "Pacífico", "Palmira", "Pândora", "Pantaleão",
    "Paulaine", "Paulina", "Peixoto", "Penélope", "Peregrino",
    "Petânia", "Petronila", "Piazza", "Piedade", "Ponziano",
    "Porfírio", "Priscylla", "Procópio",

    "Quésia", "Quietéria", "Quintiliano", "Quitute",

    "Radamés", "Raimunda", "Raimunilde", "Ramayana", "Ramiro",
    "Ranulfo", "Ravena", "Reinilda", "Remígio", "Renataide",
    "Renilda", "Reynaldo", "Ribas", "Ricardina", "Rilde",
    "Rildon", "Rinaldo", "Risalva", "Risoleta", "Rivanildo",
    "Rivelino", "Riziomar", "Roberval", "Rocilda", "Roque",
    "Rosalba", "Rosalina", "Rosângela", "Roseno", "Rubiomar",

    "Sabina", "Sadi", "Sadraque", "Salbiano",
    "Samaraíde", "Samirene", "Sandalio", "Sansão", "Santelmo",
    "Santil", "Saraiva", "Sebastiana", "Sebastiano", "Serafim",
    "Serenaide", "Serina", "Severino", "Sidônio", "Sigifrida",
    "Silmarina", "Silvério", "Sineide", "Sinfrônio", "Sirineu",
    "Solange", "Solano", "Solimões", "Soraya", "Sostenes",
    "Sulamita",

    "Taciana", "Tácito", "Tainere", "Tairone", "Talvane",
    "Tamaraíde", "Tamires", "Tancredo", "Tarcila", "Targino",
    "Tarcísio", "Teixeira", "Telvina", "Tenório", "Tercília",
    "Tertuliano", "Terezinha", "Tiolino", "Tirso", "Tobias",
    "Toscano", "Trindade",

    "Ubiraci", "Ubiratan", "Uciel", "Udevaldo", "Udelina",
    "Uenderson", "Uiana", "Ulisses", "Ulivan", "Umbelina",
    "Urbina", "Urbano",

    "Valcenir", "Valdeci", "Valdilene", "Valdívia", "Valdomiro",
    "Valmira", "Valni", "Valquíria", "Valterson", "Vandecy",
    "Vanderlei", "Vanderlice", "Vanderlucia", "Vaner",
    "Vangivaldo", "Vanilda", "Vaniuza", "Vanzina", "Varnei",
    "Venâncio", "Verdolino", "Verenice", "Veríssimo", "Vertolino",
    "Vicentina", "Victorina", "Vilmara", "Vilnei", "Vinuto",
    "Virgílio", "Virgínia", "Vitomir", "Viviano",

    "Waldemar", "Waldemira", "Walker", "Wallaceon", "Walquiria",
    "Wandercy", "Wandineia", "Welniton", "Wellerson", "Weliton",
    "Wender", "Wenderson", "Wergley", "Wescley", "Weslen",
    "Wilkson", "Williane", "Wilsonete", "Wlademir", "Wlademira",
    "Wolney",

    "Xandico", "Xantipa", "Xavierino", "Xeliana", "Xilena",

    "Yales", "Yamira", "Yanderson", "Yanka", "Yanliz",
    "Yarleni", "Yasminne", "Yasmimara", "Ygorina", "Ylunior",

    "Zacarias", "Zacilene", "Zaila", "Zaqueu", "Zarifa",
    "Zaviane", "Zedequias", "Zelena", "Zelina", "Zelito",
    "Zenilda", "Zenilson", "Zenóbio", "Zequinha", "Zilda",
    "Zilmar", "Zimário", "Zinaldo", "Zita", "Zoraide",
    "Zulmara", "Zundenir"
]


URL = "https://servicodados.ibge.gov.br/api/v2/censos/nomes/{}"

nomes_filtrados = []

print("🔍 Consultando nomes no IBGE...\n")

for nome in nomes:
    try:
        response = requests.get(URL.format(nome))
        data = response.json()

        if isinstance(data, list) and len(data) > 0:

            # 🔥 SOMA TODAS AS FREQUÊNCIAS = TOTAL REAL
            total = sum(item["frequencia"] for item in data[0]["res"])

            # Filtrar somente entre 1 e 20
            if 1 <= total <= 30:
                nomes_filtrados.append({
                    "nome": nome,
                    "frequencia": total
                })

            print(f"{nome} → {total} registros")

        else:
            print(f"{nome} → NÃO ENCONTRADO")

    except Exception as e:
        print(f"Erro com nome {nome}: {e}")

    # Para não dar rate-limit
    time.sleep(0.2)

# Salvar resultado

with open("nomes_filtrados.json", "w", encoding="utf-8") as f:
    json.dump(nomes_filtrados, f, ensure_ascii=False, indent=2)

print("\n✔️ FINALIZADO!")
print(f"Total de nomes no intervalo 1–30 registros: {len(nomes_filtrados)}")
print("Arquivo salvo: nomes_filtrados.json")
