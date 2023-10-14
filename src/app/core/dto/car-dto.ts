import { TractionTypes } from "../enums/traction-types"
import { TransmissionType } from "../enums/transmission-type"

export interface CarDto {
    carCode?: number
    carBrandDescription: string
    reference: string
    price: number
    modelYear: Date
    color: string
    horsepower: number
    numberDoors: number
    engineDisplacement: number
    transmission: TransmissionType
    fuelType: string
    numberSeat: number
    traction: TractionTypes
    steering: string
    category: string
    imagePath: string
}
