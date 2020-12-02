import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker , MuiPickersUtilsProvider } from "@material-ui/pickers";

function DatePickerCustom(props) {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                autoOk={true}
                placeholder={"Due Date"}
                value={props.value ? new Date(props.value): null}
                className="date-picker"
                defaultValue={null}
                onChange={(value) =>{
                    props.onChange(value);
                }}
            />
        </MuiPickersUtilsProvider>
    );

};
export default DatePickerCustom