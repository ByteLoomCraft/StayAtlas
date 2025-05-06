import React, { useEffect } from 'react'
import VillaHeader from '../components/VillaHeader'
import VillaDetails from '../components/VilaDetail'
import Testimonials from '../components/Testimonials'
import Gallery from "../components/Gallery"
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from "../utils/axios"
import { Loader } from 'lucide-react'

const Booking = () => {
  const {id} = useParams()
  const [property, setProperty] = React.useState({})

  useEffect(() => {
    async function fetchBooking(){
      try{
        // console.log(id)
        const {data} = await axios.get(`/v1/villas/${id}`)
        if(data.statusCode!==200){
          toast.error("No Booking Data Found")
        }else{
          setProperty(data.data)
        }
      }catch(error){
        console.error("Error fetching exclusive data:", error);
      }
    }
    fetchBooking()
  },[])

  if(!property){
    return <div>
      <h1 className="flex justify-center items-center h-screen"><Loader className=" font-extrabold size-11 animate-spin"/></h1>
    </div>
  }

  console.log(property)

  return (
    <div>
      <VillaHeader title={property.villaName}/>
      <Gallery photos={property.images}/>
      <VillaDetails property={property}/>
      <Testimonials/>
    </div>
  )
}

export default Booking