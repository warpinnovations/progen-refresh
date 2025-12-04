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
    displayName: "Mr. Joshua James Enriquez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "101Food",
    displayName: "Ms. Jona Mae Antiquiera",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MorePowerEngrJMZaporteza",
    displayName: "Engr. Joe-Mel (JM) Zaporteza",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MorePowerMrRaphaelDorilag",
    displayName: "Mr. Raphael Dorilag",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ImperialAppliancePlazaMsErikaTiu",
    displayName: "Ms. Erika Tiu",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ImperialAppliancePlazaMsMaSarahJaleco ",
    displayName: "Ms. Ma. Sarah Jaleco",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ImperialAppliancePlazaMrChesterTiu",
    displayName: "Mr. Chester Tiu",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PCCI",
    displayName: "Mr. Jherduen 'Noi' Dongor",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DamiresHillsFarmResortMrMarlonNavarro",
    displayName: "Mr. Marlon Navarro",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DamiresHillsFarmResortChristineIcabandi",
    displayName: "Christine Icabandi",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MunicipalityofMaasin",
    displayName: "Municipality of Maasin",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MetroPacificIloiloWaterAttyJCBangoy",
    displayName: "Atty. JC Bangoy",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MetroPacificIloiloWaterMrsBeaBadiangoMelliza",
    displayName: "Mrs. Bea Badiango-Melliza",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PaoloLorenzoTirador",
    displayName: "Mr. Paolo Lorenzo Tirador",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },

  {
    id: "DTI",
    displayName: "Regional Director Dinda R. Tamayo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "EON",
    displayName: "Mr. Felix Tiu",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MrLemuelFernandez",
    displayName: "Mr. Lemuel Fernandez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MrsToniDinahCheerFernandez",
    displayName: "Mrs. Toni Dinah Cheer Fernandez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ArianneFernandez",
    displayName: "Mrs. Arianne Fernandez",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DGFrancisAllanAngelo",
    displayName: "Francis Allan Angelo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "DGAriane Angelo",
    displayName: "Ariane Angelo",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "ILOMOCA",
    displayName: "Mrs. JP Tolentino",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PRFamily",
    displayName: "Mrs. Bea Tusing-Fanega",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "CityRepCouncilorMiguelTrenas",
    displayName: "Councilor Miguel Treñas",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "CityRepJayTrenas",
    displayName: "Mr. Jay Treñas",
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
    displayName: "Mr. Ken Jaspe",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "SMMrTroyCamarista",
    displayName: "Mr. Troy Camarista",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "SMMrRJEspinosa",
    displayName: "Mr. RJ Espinosa",
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
    displayName: "Mrs. Bea Tusing-Fanega",
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
    displayName: "Mr. Babak Niaraki",
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
    id: "MarriotNatalieLim",
    displayName: "Ms. Natalie Lim",
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
    id: "JCIRegattaJoeyInfante",
    displayName: "Joey Infante",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "JCIRegattaAgustinEstoqe",
    displayName: "Agustin Estoqe",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PeterOnate",
    displayName: "Peter Oñate",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MaJenniferOnate",
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
    displayName: "Atty. Eduardo T. Reyes III",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PanesLawOfficeAttyAnfredPanes",
    displayName: "Atty. Anfred Panes",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "PanesLawOfficeAttyDonWadeComoro",
    displayName: "Atty. Don Wade Comoro",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MayorFrancisAmboy",
    displayName: "Mayor Francis 'Ansing' Amboy",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "MrChesterTiu",
    displayName: "Mr. Chester Tiu",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "FMCLawAttyJennelLamatao",
    displayName: "Atty. Jennel Lamatao",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  },
  {
    id: "FMCLawChazelleGubatanga",
    displayName: "Chazelle Gubatanga",
    muxPlaybackId: "Z4BlD006h2SuRkPK00tlhh1vvQlJmGt101kEaBnd9mj5HU",
  }

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
