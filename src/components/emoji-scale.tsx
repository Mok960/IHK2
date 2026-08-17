import { EMOJI_SCALE } from "@/lib/constants";

export function EmojiScale({
  value,
  name = "emoji",
}: {
  value?: string;
  name?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm text-muted">Stimmungsskala</legend>
      <div className="grid grid-cols-5 gap-2">
        {EMOJI_SCALE.map((item) => (
          <label
            key={item.value}
            className="group cursor-pointer rounded-2xl border border-lilac/20 bg-white p-3 text-center transition has-[:checked]:border-mint has-[:checked]:bg-mint/20"
          >
            <input
              type="radio"
              name={name}
              value={item.value}
              defaultChecked={value ? value === item.value : item.value === "🙂"}
              className="sr-only"
            />
            <span className="block text-2xl">{item.value}</span>
            <span className="mt-2 block text-[11px] tracking-wide text-muted uppercase">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function EmojiBadge({ emoji }: { emoji: string }) {
  const match = EMOJI_SCALE.find((item) => item.value === emoji);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
      <span className="text-lg">{emoji}</span>
      <span className="text-muted">{match?.label ?? "Stimmung"}</span>
    </span>
  );
}
