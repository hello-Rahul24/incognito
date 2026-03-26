// Avatar.tsx
// Usage: <Avatar initials="NF" size={28} />

type AvatarProps = {
  initials: string;
  size?: number;
};

const avatarColors: Record<string, { bg: string; text: string }> = {
  NF: { bg: "rgba(127,119,221,0.2)", text: "#9b94f0" },
  TM: { bg: "rgba(29,158,117,0.2)",  text: "#5DCAA5" },
  CV: { bg: "rgba(186,117,23,0.2)",  text: "#EF9F27" },
  SG: { bg: "rgba(212,83,126,0.2)",  text: "#ED93B1" },
};

export default function Avatar({ initials, size = 28 }: AvatarProps) {
    
  const colors = avatarColors[initials] ?? {
    bg: "#c1d0ff",
    text: "#171650",
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: colors.bg,
        color: colors.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.36,
        fontWeight: 600,
        flexShrink: 0,
        fontFamily: "monospace",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}