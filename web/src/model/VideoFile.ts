import { TextAttributes } from "../lib/types/TextAttributes";
import { PartialRange } from "../lib/helpers/Range";
import { Transient } from "../lib/entity/Entity";
import { Template } from "./Template";

/**
 * File cluster query filters.
 */
export type ClusterFilters = {
  hops?: number;
  minDistance?: number;
  maxDistance?: number;
};

/**
 * Supported file sorting attributes.
 */
export enum FileSort {
  date = "date",
  length = "length",
  related = "related",
  duplicates = "duplicates",
}

/**
 * File categories by match distances.
 */
export enum MatchCategory {
  all = "all",
  duplicates = "duplicates",
  related = "related",
  unique = "unique",
}

/**
 * File query filters.
 */
export type FileFilters = {
  query: string;
  extensions: string[];
  length: PartialRange;
  date: PartialRange<string>;
  audio: boolean | null;
  matches: MatchCategory;
  sort: FileSort;
  remote: boolean | null;
  templates: Template["id"][];
  contributors: Contributor["id"][];
};

/**
 * Default files query parameters;
 */
export const DefaultFilters: FileFilters = {
  query: "",
  extensions: [],
  length: { lower: null, upper: null },
  date: { lower: null, upper: null },
  audio: null,
  matches: MatchCategory.all,
  sort: FileSort.date,
  remote: false,
  templates: [],
  contributors: [],
};

/**
 * File metadata attributes.
 */
export type FileMetadata = {
  uploadedBy?: string;
  uploadDate?: Date;
  updatedDate?: number;
  fileType?: string;
  length: number;
  frames?: number;
  codec?: string;
  grayMax?: number;
  grayStd?: number;
  stdAverage?: number;
  maxDiff?: number;
  hasEXIF?: boolean;
  hasAudio?: boolean;
  quality?: number;
  flagged?: boolean;
  created?: Date;
};

/**
 * Remote signature repository types.
 */
export enum RepositoryType {
  BARE_DATABASE = "BARE_DATABASE",
}

/**
 * Repository statistics.
 */
export type RepositoryStats = {
  partnersCount: number;
  totalFingerprintsCount: number;
  pushedFingerprintsCount: number;
  pulledFingerprintsCount: number;
};

/**
 * Remote signature repository.
 */
export type Repository = {
  id: number;
  name: string;
  address: string;
  login: string;
  type: RepositoryType;
  lastSynced?: Date;
  stats?: RepositoryStats;
};

/**
 * Remote repository prototype
 */
export type RepositoryPrototype = Transient<Repository> & {
  credentials: string;
};

/**
 * Contributor statistics.
 */
export type ContributorStats = {
  totalFingerprintsCount: number;
  pulledFingerprintsCount: number;
};

/**
 * Remote signature-repository contributor.
 */
export type Contributor = {
  id: number;
  name: string;
  repository: Repository;
  stats?: ContributorStats;
};

/**
 * Remote repository filters.
 */
export type RepositoryFilters = {
  name?: string;
};

/**
 * Remote repo contributor filters.
 */
export type ContributorFilters = {
  name?: string;
  repositoryId?: number;
};

/**
 * Property type for Scene in a video file.
 */
export type Scene = {
  id: number;
  /** Preview URL */
  preview: string;
  /** Scene start time position */
  position: number;
  /** Scene duration, ms */
  duration: number;
};

/**
 * Exif data.
 */
export type Exif = {
  Audio_BitRate: number;
  Audio_Channels: number;
  Audio_Duration: number;
  Audio_Encoded_Date: number;
  Audio_Format: string;
  Audio_SamplingRate: number;
  Audio_Tagged_Date: number;
  Audio_Title: string;
  General_Duration: number;
  General_Encoded_Date: number;
  General_FileExtension: string;
  General_FileSize: number;
  General_File_Modified_Date: number;
  General_File_Modified_Date_Local: number;
  General_Format_Commercial: string;
  General_FrameCount: number;
  General_FrameRate: number;
  General_OverallBitRate: number;
  General_OverallBitRate_Mode: string;
  General_Tagged_Date: number;
  Json_full_exif: { [category: string]: TextAttributes };
  Video_BitRate: number;
  Video_Format: string;
  Video_FrameRate: number;
  Video_Height: number;
  Video_InternetMediaType: string;
  Video_Width: number;
};

/**
 * File index by id.
 */
export type FileIndex = {
  [id: string]: VideoFile;
};

/**
 * Video frame descriptor.
 */
export type FrameDescriptor = {
  file: VideoFile;
  time: number;
};

/**
 * Video file type.
 */
export type VideoFile = {
  id: number;
  filename: string;
  metadata?: FileMetadata;
  hash: string;
  fingerprint: string;
  preview: string;
  playbackURL: string;
  exif?: Exif;
  external: boolean;
  contributor?: Contributor;
  relatedCount?: number;
  duplicatesCount?: number;
  matchedTemplateIds?: number[];
  scenes: Scene[];
};
