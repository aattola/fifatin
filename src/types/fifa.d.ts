export interface Game {
  IdMatch: string
  IdStage: string
  IdGroup: string
  IdSeason: string
  IdCompetition: string
  CompetitionName: CompetitionName[]
  SeasonName: CompetitionName[]
  SeasonShortName: any[]
  Stadium: Stadium
  ResultType: number
  MatchDay: string
  HomeTeamPenaltyScore: number
  AwayTeamPenaltyScore: number
  AggregateHomeTeamScore: null
  AggregateAwayTeamScore: null
  Weather: Weather
  Attendance: null
  Date: Date
  LocalDate: Date
  MatchTime: string
  SecondHalfTime: null
  FirstHalfTime: null
  FirstHalfExtraTime: null
  SecondHalfExtraTime: null
  Winner: null
  Period: number
  HomeTeam: Team
  AwayTeam: Team
  BallPossession: BallPossession
  TerritorialPossesion: null
  TerritorialThirdPossesion: null
  Officials: Official[]
  MatchStatus: number
  GroupName: CompetitionName[]
  StageName: CompetitionName[]
  OfficialityStatus: number
  TimeDefined: boolean
  Properties: Properties
  IsUpdateable: null
}

export interface Team {
  Score: number
  Side: null
  IdTeam: string
  PictureUrl: string
  IdCountry: Abbreviation
  TeamType: number
  AgeType: number
  Tactics: string
  TeamName: CompetitionName[]
  Abbreviation: Abbreviation
  Coaches: Coach[]
  Players: Player[]
  Bookings: any[]
  Goals: Goal[]
  Substitutions: Substitution[]
  FootballType: number
  Gender: number
  IdAssociation: Abbreviation
  ShortClubName: string
}

export enum Abbreviation {
  Den = "DEN",
  Ger = "GER",
  Jpn = "JPN",
}

export interface Coach {
  IdCoach: string
  IdCountry: Abbreviation
  PictureUrl: null | string
  Name: CompetitionName[]
  Alias: CompetitionName[]
  Role: number
  SpecialStatus: null
}

export interface Goal {
  Type: number
  IdPlayer: string
  Minute: string
  IdAssistPlayer: string
  Period: number
  IdGoal: null
  IdTeam: string
}

export interface Player {
  IdPlayer: string
  IdTeam: string
  ShirtNumber: number
  Status: number
  SpecialStatus: number | null
  Captain: boolean
  PlayerName: CompetitionName[]
  ShortName: CompetitionName[]
  Position: number
  PlayerPicture: PlayerPicture
  FieldStatus: number
  LineupX: number | null
  LineupY: number | null
}

export interface PlayerPicture {
  Id: string
  PictureUrl: string
}

export interface Substitution {
  IdEvent: null
  Period: number
  Reason: number
  SubstitutePosition: number
  IdPlayerOff: string
  IdPlayerOn: string
  PlayerOffName: CompetitionName[]
  PlayerOnName: CompetitionName[]
  Minute: string
  IdTeam: string
}

export interface Games {
  ContinuationToken: null
  ContinuationHash: null
  Results: Result[]
}

export interface Result {
  IdCompetition: string
  IdSeason: string
  IdStage: string
  IdGroup: null | string
  Weather: Weather | null
  Attendance: null | string
  IdMatch: string
  MatchDay: null | string
  StageName: CompetitionName[]
  GroupName: CompetitionName[]
  CompetitionName: CompetitionName[]
  SeasonName: CompetitionName[]
  SeasonShortName: any[]
  Date: Date
  LocalDate: Date
  Home: Away | null
  Away: Away | null
  HomeTeamScore: number | null
  AwayTeamScore: number | null
  AggregateHomeTeamScore: null
  AggregateAwayTeamScore: null
  HomeTeamPenaltyScore: number | null
  AwayTeamPenaltyScore: number | null
  LastPeriodUpdate: null
  Leg: null
  IsHomeMatch: null
  Stadium: Stadium
  IsTicketSalesAllowed: null
  MatchTime: null | string
  SecondHalfTime: null
  FirstHalfTime: null
  FirstHalfExtraTime: null
  SecondHalfExtraTime: null
  Winner: null | string
  MatchReportUrl: null
  PlaceHolderA: string
  PlaceHolderB: string
  BallPossession: BallPossession | null
  Officials: Official[]
  MatchStatus: number
  ResultType: number
  MatchNumber: number
  TimeDefined: boolean
  OfficialityStatus: number
  MatchLegInfo: null
  Properties: Properties
  IsUpdateable: null
}

export interface Away {
  Score: number | null
  Side: null
  IdTeam: string
  PictureUrl: string
  IdCountry: string
  Tactics: null | string
  TeamType: number
  AgeType: number
  TeamName: CompetitionName[]
  Abbreviation: string
  ShortClubName: string
  FootballType: number
  Gender: number
  IdAssociation: string
}

export interface CompetitionName {
  Locale: Locale
  Description: string
}

export enum Locale {
  EnGB = "en-GB",
  LocaleEnGB = "en-gb",
}

export interface BallPossession {
  Intervals: any[]
  LastX: any[]
  OverallHome: number
  OverallAway: number
}

export interface Official {
  IdCountry: string
  OfficialId: string
  NameShort: CompetitionName[]
  Name: CompetitionName[]
  OfficialType: number
  TypeLocalized: CompetitionName[]
}

export interface Properties {
  IdIFES: string
}

export interface Stadium {
  IdStadium: string
  Name: CompetitionName[]
  Capacity: null
  WebAddress: null
  Built: null
  Roof: boolean
  Turf: null
  IdCity: string
  CityName: CompetitionName[]
  IdCountry: IDCountry
  PostalCode: null
  Street: null
  Email: null
  Fax: null
  Phone: null
  AffiliationCountry: null
  AffiliationRegion: null
  Latitude: null
  Longitude: null
  Length: null
  Width: null
  Properties: Properties
  IsUpdateable: null
}

export enum IDCountry {
  Qat = "QAT",
}

export interface Weather {
  Humidity: string
  Temperature: string
  WindSpeed: string
  Type: number
  TypeLocalized: CompetitionName[]
}
