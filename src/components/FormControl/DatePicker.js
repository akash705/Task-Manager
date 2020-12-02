import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker , MuiPickersUtilsProvider } from "@material-ui/pickers";

function DatePickerCustom(props) {

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                autoOk={true}
                placeholder={"Pick a date"}
                value={props.value ? new Date(props.value): ""}
                className="date-picker"
                defaultValue={""}
                onChange={(value, date) =>{
                    props.onChange(value);
                }}
            />
        </MuiPickersUtilsProvider>
    );

};
export default DatePickerCustom