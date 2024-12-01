// src/Home.js
import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { claimOfferStyle, premiumModalStyle } from "../AppStyle";
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Chip from "@mui/material/Chip";

const ClaimOffer = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        window.open("https://www.google.com/", "_blank");
        // setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState('yearly');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <React.Fragment>
            <Box className={"claim-offer "} sx={claimOfferStyle} onClick={handleOpen}>
                <Card sx={{ maxWidth: 345 }} className="relative">
                    <CardMedia
                        className={'robot-image'}
                        sx={{ height: 140 }}
                        image={'/images/robot.png'}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Try ChatOn Premium
                        </Typography>
                        <Typography variant="body2">
                            Click to claim your ofer now!
                        </Typography>
                    </CardContent>
                    <CardActions className={'got-arrow'}>
                        <ArrowForwardIosIcon />
                    </CardActions>
                </Card>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                className={'premium-modal-wrap'}
            >
                <Box sx={premiumModalStyle} className={'premium-modal-body'}>
                    <Button onClick={handleClose} startIcon={<CloseIcon />} class={"close-button"} />
                    <h2 id="child-modal-title">Get <Box className={'pro-text'} component={'span'}>Pro</Box> access </h2>
                    <Box className={'tags'}>
                        <Chip avatar={<Avatar src="/images/rocket.png" />}
                            size={'medium'}
                            color={'primary'}
                            label={
                                <div className={'option-content'}>
                                    <Typography className={'title'} variant="body1">Instant </Typography>
                                    <Typography className={'sub-title'} variant="body2">Response</Typography>
                                </div>
                            }
                        />
                        <Chip avatar={<Avatar src="/images/ic_robot.png" />}
                            size={'medium'}
                            color={'primary'}
                            label={
                                <div className={'option-content'}>
                                    <Typography className={'title'} variant="body1">Chat </Typography>
                                    <Typography className={'sub-title'} variant="body2">History</Typography>
                                </div>
                            }
                        />
                        <Chip avatar={<Avatar src="/images/abc.png" />}
                            size={'medium'}
                            color={'primary'}
                            label={
                                <div className={'option-content'}>
                                    <Typography className={'title'} variant="body1">Image to</Typography>
                                    <Typography className={'sub-title'} variant="body2">Text(OCR)</Typography>
                                </div>
                            }
                        />
                        <Chip avatar={<Avatar src="/images/ic_robot.png" />}
                            size={'medium'}
                            color={'primary'}
                            label={
                                <div className={'option-content'}>
                                    <Typography className={'title'} variant="body1">Powered By</Typography>
                                    <Typography className={'sub-title'} variant="body2">GPT-4</Typography>
                                </div>
                            }
                        />
                        <Chip avatar={<Avatar src="/tasks_for_ai/thought-light.png" />}
                            size={'medium'}
                            color={'primary'}
                            label={
                                <div className={'option-content'}>
                                    <Typography className={'title'} variant="body1">Unlimited</Typography>
                                    <Typography className={'sub-title'} variant="body2">Messageds</Typography>
                                </div>
                            }
                        />

                        <Chip avatar={<Avatar src="/tasks_for_ai/thought-light.png" />}
                            size={'medium'}
                            color={'primary'}
                            label={
                                <div className={'option-content'}>
                                    <Typography className={'title'} variant="body1">moredetailed</Typography>
                                    <Typography className={'sub-title'} variant="body2">answers</Typography>
                                </div>
                            }
                        />


                    </Box>
                    <Box className={'offer-price'}>
                        <FormControl component="fieldset">
                            <RadioGroup value={value} onChange={handleChange}>
                                <FormControlLabel
                                    value="yearly"
                                    control={<Radio />}
                                    label={
                                        <div className={'option-content'}>
                                            <Typography variant="body2" class={'save-tag'}>Save 89%</Typography>
                                            <Typography variant="body1">Yearly Access</Typography>
                                            <Typography variant="body2">BDT 4,000.00 /
                                                Week</Typography>

                                        </div>
                                    }
                                    className={'payment-option yearly-payment'}
                                />
                                <FormControlLabel
                                    value="weekly"
                                    control={<Radio />}
                                    label={
                                        <div className={'option-content'}>
                                            <Typography variant="body1">Weekly Access</Typography>
                                            <Typography variant="body2">BDT 750.00 /
                                                Week</Typography>
                                        </div>
                                    }
                                    className={'payment-option weekly-payment'}
                                />
                            </RadioGroup>
                            <Button variant="contained" color="primary">Continue</Button>
                        </FormControl>
                    </Box>

                </Box>
            </Modal>
        </React.Fragment>

    );
};

export default ClaimOffer;
