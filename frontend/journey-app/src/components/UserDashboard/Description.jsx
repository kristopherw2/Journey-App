import "./Description.css";
function Description(props) {
  return (
    <div className="image-description">
      <p maxLength="255">
        {props.description}
        {/* Username: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        dignissim, ligula non consectetur pharetra, turpis ipsum suscipit orci,
        et consectetur mi mauris eu justo. Donec egestas pellentesque sem at
        feugiat. Fusce in metus lacinia arcu tincidunt sagittis. Cras quis erat
        nec sem tempor viverra dapibus vitae ipsum. Suspendisse ornare. */}
      </p>
    </div>
  );
}
export default Description;
