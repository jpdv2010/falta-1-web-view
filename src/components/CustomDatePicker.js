// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
// import DateTimePicker from "react-datetime-picker";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker as Picker } from '@mui/x-date-pickers/DateTimePicker';

const CustomDatePicker = ({onChange, value}) => {
    fontawesome.library.add(faCalendarDay);

    return (
        <>
            {/* <DateTimePicker onChange={onChange} value={value} format="dd/MM/yyyy hh:mm:ss a" className="custom-date-picker" calendarIcon={<FontAwesomeIcon icon="fa-solid fa-calendar-day" />}></DateTimePicker> */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={value}
                    onChange={onChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
        </>
    );
}

export default CustomDatePicker;