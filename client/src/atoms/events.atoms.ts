import { atom } from "jotai";
import { EventsInterface, EventsIdsObject } from "../types/events.types";
import { arrayToObjectWithIdsAsKeysAndNoValue } from "../utils/array";

// Used on init
export const eventsAtom = atom<Array<EventsInterface>>([]);
export const eventsIdsAtom = atom<EventsIdsObject>({});
export const newEventsIdsAtom = atom<EventsIdsObject>({});

export const fetchEventsAtom = atom(
  (get) => get(eventsAtom),
  async (_get, set, onFinish?: Function) => {
    const getResponse = async () => {
      const response = await fetch(
        `http://localhost:3000/api/actions?page=1&per_page=100`
      );
      const data = await response.json();

      const eventsIds = arrayToObjectWithIdsAsKeysAndNoValue(data);

      set(eventsAtom, data);
      set(eventsIdsAtom, eventsIds);
      set(newEventsIdsAtom, {});
      if (onFinish) onFinish();
    };
    getResponse();
  }
);

export const checkNewEventsAtom = atom(
  (get) => get(newEventsIdsAtom),
  async (get: Function, set: Function) => {
    const getResponse = async () => {
      const response = await fetch(
        `http://localhost:3000/api/actions?page=1&per_page=100`
      );
      const data = await response.json();

      let newEvents: Array<EventsInterface> = [];
      const eventsIds = get(eventsIdsAtom);
      data.forEach((el: EventsInterface) => {
        const id = String(el.id);
        if (eventsIds[id]) return;

        newEvents.push(el);
      });

      set(newEventsIdsAtom, newEvents);
    };
    getResponse();
  }
);
