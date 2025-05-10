import React from "react";
import logo from "../../assets/stay.jpg";
import { useNavigate } from 'react-router-dom';

import {
  Card, 
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react"

import {
  PresentationChartBarIcon,
  UserCircleIcon,
  HomeModernIcon,
  IdentificationIcon,
  CurrencyRupeeIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid"

import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"

export default function Sidebar({setSelectedPage}) {
    const [open, setOpen] = React.useState(0);
    const [openAlert, setOpenAlert] = React.useState(true);

    const navigate = useNavigate();
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[30rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 flex items-centre gap-4 p-4" onClick={() => navigate('/')}>
                <img src={logo} alt="logo stay atlas" className="h-12 w-12"/>
                <Typography variant="h4" color="green">
                    Admin Stay Atlas
                </Typography>
            </div>

            <List className="cursor-pointer">
                <Accordion
                   open = {open === 1}
                   icon={
                    <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                    />
                   }
                >
                    <ListItem className="p-5 hover:bg-green-300 transition-all rounded-md" onClick={() => setSelectedPage("Dashboard")}>
                        <ListItemPrefix>
                            <PresentationChartBarIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        <Typography variant="h5" color="green" className="mr-auto font-normal">
                            Dashboard
                        </Typography>
                    </ListItem>
                    <ListItem className="p-5 hover:bg-green-300 transition-all rounded-md" onClick={() => setSelectedPage("VillaManagement")}>
                        <ListItemPrefix>
                            <HomeModernIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        <Typography variant="h5" color="green" className="mr-auto font-normal">
                            Villa Management
                        </Typography>
                    </ListItem>
                    <ListItem className="p-5 hover:bg-green-300 transition-all rounded-md" onClick={() => setSelectedPage("BookingManagement")}>
                        <ListItemPrefix>
                            <IdentificationIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        <Typography variant="h5" color="green" className="mr-auto font-normal">
                            Booking Management
                        </Typography>
                    </ListItem>
                    <ListItem className="p-5 hover:bg-green-300 transition-all rounded-md" onClick={() => setSelectedPage("UserManagement")}>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        <Typography variant="h5" color="green" className="mr-auto font-normal">
                            User Management
                        </Typography>
                    </ListItem>
                    <ListItem className="p-5 hover:bg-green-300 transition-all rounded-md" onClick={() => setSelectedPage("ContentManagement")}>
                        <ListItemPrefix>
                            <VideoCameraIcon className="h-6 w-6" />
                        </ListItemPrefix>
                        <Typography variant="h5" color="green" className="mr-auto font-normal">
                            Content Management
                        </Typography>
                    </ListItem>
                    

                </Accordion>
            </List>
        </Card>
    )
}