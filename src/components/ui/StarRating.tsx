import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { useFormContext } from "react-hook-form";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

type StarRatingProps = {
  name: string;
  maxStars?: number;
};

export function StarRating({ name, maxStars = 6 }: StarRatingProps) {
  const { watch, setValue } = useFormContext();
  const [hover, setHover] = useState(0);

  const rating = watch(name) || 0;

  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((num) => (
        <FontAwesomeIcon
          key={num}
          icon={(num <= (hover || rating) ? faStarSolid : faStarRegular) as IconProp}
          className="cursor-pointer text-2xl text-yellow-400"
          onClick={() => setValue(name, num)}
          onMouseEnter={() => setHover(num)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
}
