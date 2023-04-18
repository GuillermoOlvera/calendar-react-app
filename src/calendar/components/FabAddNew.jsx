import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickView = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2),
            bgColor: '#fafafa',
            user: {
              _id: '123',
              name: 'Guillermo',
            }
        });
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickView }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
