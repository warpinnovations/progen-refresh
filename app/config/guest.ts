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
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "101Food",
    displayName: "Ms. Jona Mae Antiquiera",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MorePowerEngrJMZaporteza",
    displayName: "Engr. Joe-Mel (JM) Zaporteza",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MorePowerMrRaphaelDorilag",
    displayName: "Mr. Raphael Dorilag",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ImperialAppliancePlazaMsErikaTiu",
    displayName: "Ms. Erika Tiu",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ImperialAppliancePlazaMsMaSarahJaleco",
    displayName: "Ms. Ma. Sarah Jaleco",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ImperialAppliancePlazaMrChesterTiu",
    displayName: "Mr. Chester Tiu",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "PCCI",
    displayName: "Mr. Jherduen Dongor",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "DamiresHillsFarmResortMrMarlonNavarro",
    displayName: "Mr. Marlon Navarro",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "DamiresHillsFarmResortChristineIcabandi",
    displayName: "Christine Icabandi",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MunicipalityofMaasin",
    displayName: "Municipality of Maasin",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MetroPacificIloiloWaterAttyJCBangoy",
    displayName: "Atty. JC Bangoy",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MetroPacificIloiloWaterMrsBeaBadiangoMelliza",
    displayName: "Mrs. Bea Badiango-Melliza",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "PaoloLorenzoTirador",
    displayName: "Mr. Paolo Lorenzo Tirador",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },

  {
    id: "DTI",
    displayName: "Regional Director Dinda R. Tamayo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "EON",
    displayName: "Mr. Felix Tiu",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MrLemuelFernandez",
    displayName: "Mr. Lemuel Fernandez",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MrsToniDinahCheerFernandez",
    displayName: "Mrs. Toni Dinah Cheer Fernandez",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ArianneFernandez",
    displayName: "Mrs. Arianne Fernandez",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "DGFrancisAllanAngelo",
    displayName: "Francis Allan Angelo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "DGArrianeAngelo",
    displayName: "Arriane Angelo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ILOMOCA",
    displayName: "Mrs. JP Tolentino",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "PRFamily",
    displayName: "Mrs. Bea Tusing-Fanega",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "CityRepCouncilorMiguelTrenas",
    displayName: "Councilor Miguel Treñas",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "CityRepJayTrenas",
    displayName: "Mr. Jay Treñas",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "CityRepJulienneBaronda",
    displayName: "Rep. Julienne L. Baronda",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ProvinceRep",
    displayName: "Gov. Arthur R. Defensor Jr.",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "VMLove",
    displayName: "Vice Mayor Lady Julie Grace L. Baronda",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "Megaworld",
    displayName: "Mr. Ken Jaspe",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "SMMrTroyCamarista",
    displayName: "Mr. Troy Camarista",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "SMMrRJEspinosa",
    displayName: "Mr. RJ Espinosa",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "FrancisAllanAngelo",
    displayName: "Francis Allan Angelo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ArrianeAngelo",
    displayName: "Arriane Angelo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "BeaTusing",
    displayName: "Mrs. Bea Tusing-Fanega",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "DrLuigiAlit",
    displayName: "Dr. Luigi Alit",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "AttyCarlMondejar",
    displayName: "Atty. Carl Mondejar",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "HonDeniseVentilacion",
    displayName: "Hon. Denise Ventilacion",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "HonAmaliaDebuque",
    displayName: "Hon. Amalia Debuque",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "BabakNiaraki",
    displayName: "Mr. Babak Niaraki",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "AttyMarceloFernandez",
    displayName: "Atty. Marcelo Fernandez",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "AttyDennisVentilacion",
    displayName: "Atty. Dennis Ventilacion",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "DrKarenVentilacion",
    displayName: "Dr. Karen Ventilacion",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MikeCoo",
    displayName: "Mike Coo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "HeraBarrameda",
    displayName: "Hera Barrameda",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MarriotNatalieLim",
    displayName: "Ms. Natalie Lim",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "KeilaniCaresseBaldisimo",
    displayName: "Keilani Caresse Baldisimo",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "KevinMariFrancisCruz",
    displayName: "Kevin Mari Francis Cruz",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "JMDelaCena",
    displayName: "JM Dela Cena",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "AilaSemontina",
    displayName: "Aila Semontina",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ZachGolez",
    displayName: "Zach Golez",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "JCIRegattaJoeyInfante",
    displayName: "Joey Infante",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "JCIRegattaAgustinEstoque",
    displayName: "Agustin Estoque",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "PeterOnate",
    displayName: "Peter Oñate",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MaJenniferOnate",
    displayName: "Ma. Jennifer Oñate",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "RaymartEscopel",
    displayName: "Raymart Escopel",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "NanaJover",
    displayName: "Nana Jover",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "AttyDonYcay",
    displayName: "Atty. Don Ycay",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "AttyJPYap",
    displayName: "Atty. JP Yap",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "ETLawOffice",
    displayName: "Atty. Eduardo T. Reyes III",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "PanesLawOfficeAttyAnfredPanes",
    displayName: "Atty. Anfred Panes",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "PanesLawOfficeAttyDonWadeComoro",
    displayName: "Atty. Don Wade Comoro",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MayorFrancisAmboy",
    displayName: "Mayor Francis Amboy",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "MrChesterTiu",
    displayName: "Mr. Chester Tiu",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "FMCLawAttyJennelLamatao",
    displayName: "Atty. Jennel Lamatao",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
  },
  {
    id: "FMCLawChazelleGubatanga",
    displayName: "Chazelle Gubatanga",
    muxPlaybackId: "uXCkWqEuLOkkitsuOlsUM5WENSNhJ00xYZQEZlsix00A4",
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
