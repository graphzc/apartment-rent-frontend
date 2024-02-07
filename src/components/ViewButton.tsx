interface ViewButtonProps<T> {
    id: T;
    handleView: (id: T) => void;
};

export default function DeleteButton<T>({ id, handleView }:  ViewButtonProps<T> ) {
    return (
        <button 
            className=" bg-green-400 px-2 py-1 rounded-lg text-white"
            onClick={() => handleView(id)}
        >
           ดู 
        </button>
    )

};