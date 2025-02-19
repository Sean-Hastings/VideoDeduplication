import logging
import sys
from functools import wraps

from sqlalchemy.exc import ArgumentError as DBArgumentError, OperationalError as DBOperationalError, IntegrityError

logger = logging.getLogger(__name__)


def handle_errors(func):
    """Handle well-known errors."""

    @wraps(func)
    def wrapper(*args, **kwargs):
        """Wrapper that handles well-known errors."""
        try:
            return func(*args, **kwargs)
        except (DBOperationalError, DBArgumentError) as error:
            if hasattr(error, "orig") and error.orig is not None:
                error = error.orig
            print(f"Database error: {error}", file=sys.stderr)
            raise SystemExit(1)
        except IntegrityError as error:
            if hasattr(error, "orig") and error.orig is not None:
                error = error.orig
            print(f"Invalid request: {error}", file=sys.stderr)
            raise SystemExit(1)

    return wrapper
