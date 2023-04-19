import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async( calendarEvent ) => {

        if(calendarEvent._id) {
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            // creating
            const { data } = await calendarApi.post('/events', calendarEvent)
            console.log({data});
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {

        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}