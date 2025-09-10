import './ToggleSwitch.css';

const ToggleSwitch = ({ label, checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <span className="toggle-label">{label}</span>
      <div className="switch-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </div>
    </label>
  );
};

export default ToggleSwitch;
