import { TrashSchedule } from "./types";

async function fetchStreets(baseApiUrl: string): Promise<Array<{
  id: string;
  street: string;
}> | null> {
  const response = await fetch(`${baseApiUrl}/streets`);

  return response.json();
}

async function fetchBuildings(
  baseApiUrl: string,
  streetId: string
): Promise<Array<{
  id: string;
  buildingNumber: string;
  buildingType: string;
}> | null> {
  const response = await fetch(`${baseApiUrl}/address-points/${streetId}`);

  return response.json();
}

async function fetchTrashSchedule(
  baseApiUrl: string,
  addressId: string
): Promise<{ trashSchedule: TrashSchedule; year: string }> {
  const response = await fetch(`${baseApiUrl}/trash-schedule/${addressId}`);

  return response.json();
}

export async function fetchDetails(
  baseApiUrl: string,
  street: string,
  buildingNumber: string
): Promise<{ trashSchedule: TrashSchedule; year: string }> {
  const streets = await fetchStreets(baseApiUrl);
  const { id: streetId } =
    streets?.find((x) => x.street === street.toUpperCase()) ?? {};

  if (!streetId) {
    throw new Error("Street not found");
  }

  const buildings = await fetchBuildings(baseApiUrl, streetId);

  const { id: buildingId } =
    buildings?.find((x) => x.buildingNumber === buildingNumber.toUpperCase()) ??
    {};

  if (!buildingId) {
    throw new Error("Building not found");
  }

  const trashSchedule = await fetchTrashSchedule(baseApiUrl, buildingId);

  return trashSchedule;
}
