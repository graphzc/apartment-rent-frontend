interface submitButtonProps {
    text: string;
}

export default function SubmitButton({text}: submitButtonProps) {
    return (
        <button className="submit-button" type="submit">{text}</button>
    )
}