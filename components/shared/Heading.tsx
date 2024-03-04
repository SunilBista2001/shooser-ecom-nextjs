const Heading = ({
  title,
  description,
  ...props
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div {...props}>
      <h2 className="text-3xl text-emerald-600 font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
