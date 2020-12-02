import React, { Component, Fragment } from "react";
import { Search } from "@material-ui/icons";
import { TextField } from "@material-ui/core";
import ResetIcon from "../../resources/svg/search-reset.svg";
import "../../resources/searchbar.css";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSearchValue: props.value || "",
        };
    }

    onChange = (ev) => {
        let { onChange } = this.props;
        let value = String(ev.target.value).trimLeft();
        onChange(value);
    };



    reset = () => {
        this.setState({ lastSearchValue: "" }, () => {
            this.props.onChange("")
        });
    };

    render() {
        let { value , searchBarId = 'searchBar'  } = this.props;
        let isSmallScreen = false;
        if (window && window.innerWidth < 767) {
            isSmallScreen = true;
        }
        return (
            <Fragment>
                <div
                    className={
                        "width-100 position-relative clearfix display-flex display-block-xs "
                    }>
                    <div
                        className={
                            "width-100 position-relative"
                        }>
                        <TextField
                            variant="outlined"
                            className={
                                "searchbar border-radius-small font-16 font-12-xs"
                            }
                            value={value}
                            placeholder={
                                "Search for Tasks."
                            }
                            onChange={this.onChange}
                            onKeyDown={this.keyDown}
                            id={searchBarId}
                        />
                        <span
                            className={"position-absolute left-0 text-center"}
                            style={{
                                width: "42px",
                                height: "42px",
                            }}>
                            <Search
                                style={{ height: "42px", color: "#00000040" }}
                            />
                        </span>
                        {value ? (
                            <span
                                className={
                                    "position-absolute top-0 display-flex align-items-center justify-content-center cursor-pointer"
                                }
                                onClick={this.reset}
                                style={{
                                    height: "42px",
                                    width: "42px",
                                    right: isSmallScreen ? "0px" : "4px",
                                }}>
                                <img src={ResetIcon} alt={"Reset"}/>
                            </span>
                        ) : null}
                    </div>
                    {/* <Button
                        className={` border-radius-small color-white display-none-xs`}
                        onClick={this.submit}
                        style={{
                            height: "42px",
                            background: 'blue'
                        }}>
                        Search
                    </Button> */}
                </div>
            </Fragment>
        );
    }
}


export default SearchBar;
