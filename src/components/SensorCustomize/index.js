import * as React from 'react';
import { useCallback } from 'react';
import { Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Tooltip, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel'
import TextFieldItem from '../TextFieldItem'

import { style } from '../../styles/style';
const useStyles = style

export default function SensorCustomize({sensors, onCustomizeSensors, specialSensor=false, onRemoveSpecialSensor = () => {} }){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const fullWidth = true
    const maxWidth = 'lg'
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onChange = useCallback((tag, field, value) => {
        let index = sensors.findIndex(sensor => sensor.tag === tag)
        if (index !== -1) {
            if(field === "name"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], name: value }, ...sensors.slice(index + 1)])
            }else if(field === "description"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], description: value }, ...sensors.slice(index + 1)])
            }else if(field === "type"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], type: value }, ...sensors.slice(index + 1)])   
            }else if(field === "unit"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], unit: value }, ...sensors.slice(index + 1)])
            }else if(field === "component"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], component: value }, ...sensors.slice(index + 1)])
            }else if(field === "specialName"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], specialName: value }, ...sensors.slice(index + 1)])
            }else if(field === "derivedFromTag"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], derivedFromTag: value }, ...sensors.slice(index + 1)])
            }else if(field === "derivedFromName"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], derivedFromName: value }, ...sensors.slice(index + 1)])
            }else if(field === "calType"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], calType: value }, ...sensors.slice(index + 1)])
            }else if(field === "subType"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], subType: value }, ...sensors.slice(index + 1)])
            }else if(field === "fromUnit"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], fromUnit: value }, ...sensors.slice(index + 1)])
            }else if(field === "toUnit"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], toUnit: value }, ...sensors.slice(index + 1)])
            }else if(field === "factor"){
                onCustomizeSensors([...sensors.slice(0, index), { ...sensors[index], factor: value }, ...sensors.slice(index + 1)])
            }           
        }
    },[sensors, onCustomizeSensors])

    return(
        <>
        <Button variant="outlined" className={classes.defaultButton} onClick={handleClickOpen}>
            <Typography className={classes.contentTextBlack}>View file</Typography>
        </Button>
        <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle className={classes.dialog}>{specialSensor ? "Special Sensor File" : "Sensor File"}</DialogTitle>
            <DialogContent className={classes.dialog}>
                <Grid item container xs={12} sm={12} md={12} lg={12} spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TableContainer className={classes.tableContainer} >
                    <Table size="small" stickyHeader>
                        <TableHead>
                        {!specialSensor &&
                        <TableRow>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell align="left" className={classes.tableCell}>SENSOR_TAG</TableCell>
                            <TableCell align="left" className={classes.tableCell}>SENSOR_NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>SENSOR_DESCRIPTION</TableCell>
                            <TableCell align="left" className={classes.tableCell}>SENSOR_TYPE</TableCell>
                            <TableCell align="left" className={classes.tableCell}>SENSOR_UNIT</TableCell>
                            <TableCell align="left" className={classes.tableCell}>METHOD</TableCell>
                            <TableCell align="left" className={classes.tableCell}>COMPONENT_ID</TableCell>
                        </TableRow>
                        }
                        {specialSensor &&
                        <TableRow>
                            <TableCell className={classes.tableCell}></TableCell>
                            <TableCell align="left" className={classes.tableCell}>SPECIAL_TAG</TableCell>
                            <TableCell align="left" className={classes.tableCell}>SPECIAL_NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>DERIVED_FROM_TAG</TableCell>
                            <TableCell align="left" className={classes.tableCell}>DERIVE_FROM_NAME</TableCell>
                            <TableCell align="left" className={classes.tableCell}>CAL_TYPE</TableCell>
                            <TableCell align="left" className={classes.tableCell}>SUB_TYPE</TableCell>
                            <TableCell align="left" className={classes.tableCell}>FROM_UNIT</TableCell>
                            <TableCell align="left" className={classes.tableCell}>TO_UNIT</TableCell>
                            <TableCell align="left" className={classes.tableCell}>FACTOR</TableCell>
                        </TableRow>
                        }
                        </TableHead>
                        {!specialSensor &&
                        <TableBody>
                        {sensors.map((sensor) => {
                            return(
                            <TableRow
                            key={sensor.tag}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                {sensor.status === "new" &&
                                <>
                                    <Tooltip title={"remove from list"} placement="top">
                                        <Typography className={classes.blueText}>
                                            <IconButton  onClick={()=>onRemoveSpecialSensor(sensor.tag)}>
                                                <CancelIcon style={{fontSize:'1rem', color:"#f04461", borderRadius:5}}></CancelIcon>
                                            </IconButton>
                                        </Typography>
                                    </Tooltip>
                                     <Typography className={classes.blueText}>new!</Typography>
                                </>
                                }
                                </TableCell>
                               
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {sensor.tag}
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.tag}-name`} value={sensor.name} onChange={(value) => onChange(sensor.tag, "name", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.tag}-description`} value={sensor.description} onChange={(value) => onChange(sensor.tag, "description", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.tag}-type`} value={sensor.type} onChange={(value) => onChange(sensor.tag, "type", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.tag}-unit`} value={sensor.unit} onChange={(value) => onChange(sensor.tag, "unit", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.tag}-method`} value={sensor.method}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.tag}-component`} value={sensor.component} onChange={(value) => onChange(sensor.tag, "component", value)}></TextFieldItem>
                                </TableCell>
                            </TableRow>
                            )
                        })}
                        </TableBody>
                        }

                        {specialSensor &&
                        <TableBody>
                        {sensors.map((sensor) => {
                            return(
                            <TableRow
                            key={sensor.tag}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                {sensor.status === "new" &&
                                <>
                                    <Tooltip title={"remove from list"} placement="top">
                                        <Typography className={classes.blueText}>
                                            <IconButton onClick={()=>onRemoveSpecialSensor(sensor.specialTag)}>
                                                <CancelIcon style={{fontSize:'1rem', color:"#f04461", borderRadius:5}}></CancelIcon>
                                            </IconButton>
                                        </Typography>
                                    </Tooltip>
                                    <Typography className={classes.blueText}>new!</Typography>
                                </>
                                }
                                </TableCell>
                                
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {sensor.specialTag}
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-specialName`} value={sensor.specialName} onChange={(value) => onChange(sensor.tag, "specialName", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-derivedFromTag`} value={sensor.derivedFromTag} onChange={(value) => onChange(sensor.tag, "derivedFromTag", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-derivedFromName`} value={sensor.derivedFromName} onChange={(value) => onChange(sensor.tag, "derivedFromName", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-calType`} value={sensor.calType} onChange={(value) => onChange(sensor.tag, "calType", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-subType`} value={sensor.subType} onChange={(value) => onChange(sensor.tag, "subType", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-fromUnit`} value={sensor.fromUnit} onChange={(value) => onChange(sensor.tag, "fromUnit", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-toUnit`} value={sensor.toUnit} onChange={(value) => onChange(sensor.tag, "toUnit", value)}></TextFieldItem>
                                </TableCell>
                                <TableCell align="left" className={classes.tableCell}>
                                    <TextFieldItem id={`${sensor.specialTag}-factor`} value={sensor.factor} onChange={(value) => onChange(sensor.tag, "factor", value)}></TextFieldItem>
                                </TableCell>
                            </TableRow>
                            )
                        })}
                        </TableBody>
                        }
                    </Table>
                    </TableContainer>
                    </Grid>
                </Grid>
  
            </DialogContent>
            <DialogActions className={classes.dialog}>
                <Button className={classes.defaultButton} onClick={handleClose}>
                    <Typography className={classes.contentTextBlack}>Close</Typography>
                </Button>
            </DialogActions>
        </Dialog>
      </>
    )
}