const RoastDots = ({ level }: { level: number }) => {
  return (
    <div className="flex items-center gap-1" aria-label={`Roast level ${level} of 3`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: i <= level ? "#5B3D2E" : "#5B3D2E33",
          }}
        />
      ))}
    </div>
  );
}

export default RoastDots;