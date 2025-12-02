export type ClientConfig = {
  id: string;
  displayName: string;
  muxPlaybackId: string;
};

export function getMuxPlayerUrl(client: ClientConfig): string {
  const title = encodeURIComponent(client.displayName);
  return `https://player.mux.com/${client.muxPlaybackId}?metadata-video-title=${title}&video-title=${title}`;
}


const clientsArray: ClientConfig[] = [

  {
    id: "JPEP",
    displayName: "JPEP - Mr. Joshua James Enriquez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "101Food",
    displayName: "101 Food - Ms. Jona Mae Antiquiera",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MorePower",
    displayName: "More Power",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ImperialAppliancePlaza",
    displayName: "Imperial Appliance Plaza",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PCCI ",
    displayName: "PCCI - Mr. Jherduen 'Noi' Dongor",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DamiresHillsFarmResort",
    displayName: "Damires Hills & Farm Resort",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MunicipalityofMaasin",
    displayName: "Municipality of Maasin",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MetroPacificIloiloWater ",
    displayName: "MetroPacificIloiloWater ",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PaoloLorenzoTirador",
    displayName: "Mr. Paolo Lorenzo Tirador",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },

  {
    id: "DTI",
    displayName: "DTI - Regional Director Dinda R. Tamayo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "EON",
    displayName: "EON - Mr. Felix Tiu",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "FernandezFamily ",
    displayName: "Fernandez Family",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DG",
    displayName: "Daily Guardian",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ILOMOCA",
    displayName: "ILOMOCA - JP Tolentino",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PRFamily",
    displayName: "PR Family - Bea Tusing-Fanega",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "CityRepCouncilorMiguelTreñas",
    displayName: "Councilor Miguel Treñas",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "taylorswift",
    displayName: "Taylor Swift",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "CityRepJayTreñas",
    displayName: "Jay Treñas",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "CityRepJulienneBaronda",
    displayName: "Rep. Julienne L. Baronda",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ProvinceRep",
    displayName: "Gov. Arthur R. Defensor Jr.",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "VMLove ",
    displayName: "Vice Mayor Lady Julie Grace L. Baronda",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "Megaworld",
    displayName: "Megaworld - Mr. Ken Jaspe",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "SM",
    displayName: "SM",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PCCI",
    displayName: "PCCI",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "FrancisAllanAngelo",
    displayName: "Francis Allan Angelo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ArrianeAngelo",
    displayName: "Arriane Angelo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "BeaTusing",
    displayName: "Bea Tusing",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DrLuigiAlit",
    displayName: "Dr. Luigi Alit",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "AttyCarlMondejar",
    displayName: "Atty. Carl Mondejar",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "HonDeniseVentilacion",
    displayName: "Hon. Denise Ventilacion",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "HonAmaliaDebuque",
    displayName: "Hon. Amalia Debuque",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "BabakNiaraki",
    displayName: "Babak Niaraki",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "AttyMarceloFernandez",
    displayName: "Atty. Marcelo Fernandez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "AttyDennisVentilacion",
    displayName: "Atty. Dennis Ventilacion",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DrKarenVentilacion",
    displayName: "Dr. Karen Ventilacion",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MikeCoo",
    displayName: "Mike Coo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "HeraBarrameda",
    displayName: "Hera Barrameda",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "NatalieLim",
    displayName: "Natalie Lim",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "KeilaniCaresseBaldisimo",
    displayName: "Keilani Caresse Baldisimo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "KevinMariFrancisCruz",
    displayName: "Kevin Mari Francis Cruz",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "JMDelaCena",
    displayName: "JM Dela Cena",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "AilaSemontina",
    displayName: "Aila Semontina",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ZachGolez",
    displayName: "Zach Golez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "JCI Regatta",
    displayName: "JCI Regatta",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PeterOñate",
    displayName: "Peter Oñate",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MaJenniferOñate",
    displayName: "Ma. Jennifer Oñate",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "RaymartEscopel",
    displayName: "Raymart Escopel",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "NanaJover",
    displayName: "Nana Jover",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "AttyDonYcay",
    displayName: "Atty. Don Ycay",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "AttyJPYap",
    displayName: "Atty. JP Yap",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ETLawOffice",
    displayName: "ET Law Office - Atty. Reyes III",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  
];

export const CLIENTS_BY_ID: Record<string, ClientConfig> = clientsArray.reduce(
  (acc, client) => {
    acc[client.id] = client;
    return acc;
  },
  {} as Record<string, ClientConfig>
);

export function getClientConfig(id: string | null): ClientConfig | null {
  if (!id) return null;
  return CLIENTS_BY_ID[id] ?? null;
}
