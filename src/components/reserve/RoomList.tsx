import useApartments from "@/api/apartment/useApartments";
import ReserveCard from "./ReserveCard";
import Room from "@/interface/Room";
import Apartment from "@/interface/Apartment";

interface ReserveRoomListProps {
    reserveFunction: (apartment: Apartment, room: Room) => void;
}

export default function ReserveRoomList({ reserveFunction }: ReserveRoomListProps) {
    const { data: apartments, error, isPending } = useApartments();

	if (error) {
		return <div>Error</div>;
	}

	if (isPending) {
		return <div>Loading...</div>;
	}

    return (
        <>
            {
                apartments?.map((apartment) => {
                    return (
                        <div key={apartment.id}>
                            <h3 className="text-xl mb-5">
                                อพาทเมนต์: {apartment.name}
                            </h3>
                            <div className="grid 2xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-4 sm:gap-7 gap-5 grid-cols-2 px-5">
                                {apartment.room?.map((room, i) => {
                                    return (
                                        <ReserveCard
                                            key={i}
                                            room={room}
                                            apartment={apartment}
                                            reserveFunction={reserveFunction}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}